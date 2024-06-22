import React, { useState, ChangeEvent, FormEvent } from 'react';

function FileUpload() {
  // Initialize state to hold a list of files and the package name
  const [files, setFiles] = useState<File[]>([]);
  const [packageName, setPackageName] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    
    // Append each file to formData
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    
    // Append the package name to formData
    formData.append('packageName', packageName);

    // Post formData to the server
    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
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
