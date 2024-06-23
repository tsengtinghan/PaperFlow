import React, { useEffect, useState } from "react";

interface FormField {
  name: string;
  description: string;
  formFieldType: string; // You can define more specific types for better type checking.
}

interface Package {
  packageId: string;
  packageName: string;
  packageStatus: string;
  originalPdfPath: string;
  imagesWithBoxesPaths: string[];
  formFields: FormField[];
  filledOutPackages: any[]; // Use a specific type if you know the structure of filled-out packages.
  typeformUrl: string;
}

const ImageModal = ({ image, onClose }: { image: string; onClose: () => boolean }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
    <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
      <img src={`http://localhost:3000/images/${image}`} alt="Expanded view" className="w-full h-full object-contain" />
      <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
);

export default function PackagePage({ params }: { params: { id: string } }) {
  const [packageDetails, setPackageDetails] = useState<Package | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/getPackage?packageId=${params.id}`) 
      .then((response) => response.json())
      .then((data: Package) => setPackageDetails(data))
      .catch((error) => console.error("Failed to fetch package details:", error));
  }, [params.id]);

  if (!packageDetails) {
    return <div>Loading...</div>; // Show a loading or placeholder while data is fetching
  }

  return (
    <div className="container px-24 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{packageDetails.packageName}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Raw PDF</h2>
          <iframe src={packageDetails.originalPdfPath} className="w-full h-96" title="Original PDF"></iframe>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Images with Boxes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {packageDetails.imagesWithBoxesPaths.map((image, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105" onClick={() => setExpandedImage(image)}>
                <img src={`http://localhost:3000/images/${image}`} alt={`Image with Box ${index + 1}`} className="w-full h-48 object-cover" />
                <div className="p-2 text-center">
                  <span className="text-sm text-gray-600">Image {index + 1} (Click to expand)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {expandedImage && (
        <ImageModal image={expandedImage} onClose={() => setExpandedImage(null)} />
      )}
    </div>
  );
}
