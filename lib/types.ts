// Type for creating a package request
type CreatePackageRequest = {
    packageName: string;
    pdfs: string[];
  };
  
  // Type for a row in the package database
  type PackageRow = {
    packageId: string;
    packageName: string;
    packageStatus: PackageStatus;
  };
  
  // Main type for package details
  type Package = {
    packageId: string;
    packageName: string;
    packageStatus: PackageStatus;
    rawPdfs: string[]; // Paths to the images of initial files passed in
    imagesWithBoxes: string[]; // Paths to the images with boxes drawn on
    formFields: FormField[]; // Form fields created by GPT for the final form
    googleFormUrl: string;
    filledOutPackages: string[]; // Paths to the filled out PDFs
  };
  
  // Type for a filled out package
  type FilledOutPackage = {
    email: string;
    pdfs: string[];
  };
  
  // Enum for package status
  enum PackageStatus {
    DETECTING = "Detecting Form Boxes with YOLO",
    ANALYZING = "Analyzing Form Boxes With GPT4o",
    CREATING = "Creating Form with GPT4o",
    COMPLETE = "Complete"
  };
  
  // Type for form fields
  type FormField = {
    name: string;
    description: string;
    type: FormFieldType;
  };
  
  // Enum for form field types
  enum FormFieldType {
    TEXT = "Text",
    MULTIPLE_CHOICE = "Multiple Choice",
    CHECKBOX = "Checkbox"
  };
  