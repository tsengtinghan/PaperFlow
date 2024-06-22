
type PackageStatus = 'pending' | 'processing' | 'complete';

type CreatePackageRequest = {
    packageName: string;
    rawFiles: File[];
};

type PackageRow = {
    packageId: string;
    packageName: string;
    packageStatus: PackageStatus;
};

type Package = {
    packageId: string;
    packageName: string;
    packageStatus: PackageStatus;
    rawFiles: File[];
    labeledFiles?: File[]; // This field is optional and depends on the status being 'complete'
};

type PackageFormRow = {
    packageFormId: string;
    packageName: string;
    name: string;
};

type PackageForm = {
    packageFormId: string;
    packageName: string;
    name: string;
    typeformUrl: string;
    files: File[];
};

export type { PackageStatus, CreatePackageRequest, PackageRow, Package, PackageFormRow, PackageForm };