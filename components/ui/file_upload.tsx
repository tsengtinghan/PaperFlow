import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [packageName, setPackageName] = useState('');

  useEffect(() => {
    // Request notification permission on component mount
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    
    formData.append('packageName', packageName);

    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      pollPackageStatus(data.packageId); 
    })
    .catch(error => console.error('Error:', error));
  };

  const pollPackageStatus = (packageId : number) => {
    const interval = setInterval(() => {
      fetch(`/api/status/${packageId}`)
        .then(response => response.json())
        .then(status => {
          console.log('Checking status:', status);
          if (status.isComplete) {
            clearInterval(interval);
            console.log('Package creation is complete.');
            showNotification('Package Ready', 'Your package has been successfully created!');
          }
        })
        .catch(error => {
          console.error('Error polling package status:', error);
          clearInterval(interval);
        });
    }, 2000); // Poll every 2000 milliseconds (2 seconds)
  };

  const showNotification = (title : string, body : string) => {
    if (Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/path/to/icon.png' }); // Customize your icon
    } else {
      alert(`${title}: ${body}`); // Fallback to alert if notifications are not permitted
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handlePackageNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPackageName(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-4">
      <input 
        type="text" 
        placeholder="Enter package name" 
        value={packageName}
        onChange={handlePackageNameChange} 
        className="p-2 rounded border border-gray-300"
      />
      <input 
        type="file" 
        multiple 
        onChange={handleFileChange} 
        className="file:rounded-lg file:border-0 file:bg-blue-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Upload Files
      </button>
    </form>
  );
}

export default FileUpload;
