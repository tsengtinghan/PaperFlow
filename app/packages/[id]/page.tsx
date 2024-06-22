'use client'
import React, { useEffect, useState } from "react";
export default async function PackagePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [files, setFiles] = useState({ rawPdfs: [], imagesWithBoxes: [] });

  useEffect(() => {
    fetch(`/getPackage?packageId=${params.id}`)
      .then(response => response.json())
      .then(data => {
        setFiles({
          rawPdfs: data.rawPdfs || [],
          imagesWithBoxes: data.imagesWithBoxes || []
        });
      })
      .catch(error => console.error('Failed to fetch package details:', error));
  }, [params.id]);

  return (
    <div>
      <h1>Package Files</h1>
      <div>
        <h2>Raw PDFs</h2>
        {files.rawPdfs.map((pdf, index) => (
          <div key={index}>
            <iframe src={`http://localhost:3000/files/${pdf}`} style={{ width: '100%', height: '500px' }} title={`Raw PDF ${index}`}></iframe>
            <a href={`http://localhost:3000/files/${pdf}`} download>
              <button>Download PDF</button>
            </a>
          </div>
        ))}
      </div>
      <div>
        <h2>Images with Boxes</h2>
        {files.imagesWithBoxes.map((image, index) => (
          <div key={index}>
            <img src={`http://localhost:3000/files/${image}`} alt={`Image with Box ${index}`} style={{ width: '100%' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

