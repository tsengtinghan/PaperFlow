"use client";
import React, { useEffect, useState } from "react";

const ImageModal = ({ image, onClose }: { image: string; onClose: () => boolean }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
    <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
      <img 
        src={`http://localhost:3000/images/${image}`} 
        alt="Expanded view" 
        className="w-full h-full object-contain"
      />
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
);

export default function PackagePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [files, setFiles] = useState({
    rawPdfs: ["calc2-test.pdf", "calc2 sec1.1 quiz.pdf"],
    imagesWithBoxes: ["image1.png", "image2.png"],
  });
  const [expandedImage, setExpandedImage] = useState(null);

  useEffect(() => {
    fetch(`/getPackage?packageId=${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setFiles({
          rawPdfs: data.rawPdfs || [],
          imagesWithBoxes: data.imagesWithBoxes || [],
        });
      })
      .catch((error) =>
        console.error("Failed to fetch package details:", error)
      );
  }, [params.id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Package Files</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Raw PDFs</h2>
          <div className="space-y-6">
            {files.rawPdfs.map((pdf, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <iframe
                  src={`http://localhost:3000/pdfs/${pdf}`}
                  className="w-full h-96 border-b"
                  title={`Raw PDF ${index + 1}`}
                ></iframe>
                <div className="p-4">
                  <a
                    href={`http://localhost:3000/pdfs/${pdf}`}
                    download
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
                  >
                    Download PDF {index + 1}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Images with Boxes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {files.imagesWithBoxes.map((image, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
                onClick={() => setExpandedImage(image)}
              >
                <img
                  src={`http://localhost:3000/images/${image}`}
                  alt={`Image with Box ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-2 text-center">
                  <span className="text-sm text-gray-600">
                    Image {index + 1} (Click to expand)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {expandedImage && (
        <ImageModal 
          image={expandedImage} 
          onClose={() => setExpandedImage(null)} 
        />
      )}
    </div>
  );
}