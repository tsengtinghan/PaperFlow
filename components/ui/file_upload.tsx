import React, { useState } from 'react';

function FileUpload() {
  // Initialize state to hold a list of files
  const [files, setFiles] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    // Append each file into formData
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    // Example POST request to your backend
    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  const handleFileChange = (event) => {
    // Update state to include all selected files
    setFiles([...event.target.files]);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-4">
      <input 
        type="file" 
        multiple // Ensure multiple attribute is set
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
