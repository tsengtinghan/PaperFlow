## API Documentation

All PackageRows or PackageFormRows are to be displayed in the table in the frontend.

### POST /processPackage
**Request Parameters:**
- `files` (List[File])
- `name` (str)

**Response:**
- `packageRows` (List[PackageRow])

frontend: upload files and create a package

---------------------------------------------------------------------------------------------

### GET /getPackagesRows
**Request Parameters:**
- None

**Response:**
- `packageRows` (List[PackageRow])

frontend: display all the packages in table

---------------------------------------------------------------------------------------------

### GET /getPackage
**Request Parameters:**
- `packageId` (str)

**Response:**
- `package` (Package)

fonrtend: click on a package row to view the package

---------------------------------------------------------------------------------------------

### POST /createPackageForm
**Request Parameters:**
- `name` (str)
- `packageId` (str)

**Response:**
- `packageFormRows` (List[PackageFormRow])

frontend: create a package form (google form)

---------------------------------------------------------------------------------------------

### GET /getPackageForm
**Request Parameters:**
- `packageFormId` (str): The ID of the package form.

**Response:**
- `packageForm`: The package form.

frontend: get the google form link and names and stuff

---------------------------------------------------------------------------------------------

### GET /getPackageFormRows
**Request Parameters:**
- None

**Response:**
- `packageFormRows` (List[PackageFormRows]): A list of package forms with minimal details.

frontend: display all the package forms in table

---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------

## Data Types

**type CreatePackageRequest**
- `packageName` (str)
- `rawFiles` (List[File])

---------------------------------------------------------------------------------------------

**type PackageRow**
- `packageId` (str)
- `packageName` (str)
- `packageStatus` (PackageStatus)

---------------------------------------------------------------------------------------------

**type Package**
- `packageId` (str)
- `packageName` (str)
- `packageStatus` (PackageStatus)
- `rawFiles` (List[File])
- `labeledFiles` (List[File]): If status is `complete`

---------------------------------------------------------------------------------------------

**type PackageFormRow**
- `packageFormId` (str)
- `packageName` (str)
- `name` (str)

---------------------------------------------------------------------------------------------

**type PackageForm**
- `packageFormId` (str)
- `packageName` (str)
- `name` (str)
- `typeformUrl` (str)
- `files` ([File]) : Filled out files from typeform

---------------------------------------------------------------------------------------------

**enum PackageStatus**
- `detecting` : `Detecting Form Boxes with YOLO`
- `analyzing` : `Analyzing Form Boxes With GPT4o`
- `creating` : `Creating Form with GPT4o`
- `complete` : `Complete`