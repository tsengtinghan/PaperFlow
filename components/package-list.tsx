'use client';

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import type { PackageRow, PackageStatus } from "@/lib/types";

export default function PackageFormList() {
  const [packageFormRows, setPackageFormRows] = useState<PackageRow[]>([]);

  const pollPackageStatus = (packageId: string, initialStatus: string) => {
    if (initialStatus === "Complete") {
      return;
    }
  
    const interval = setInterval(() => {
      fetch(`http://127.0.0.1:8000/getPackageStatus?packageId=${packageId}`)
        .then((response) => response.text())
        .then((statusText) => {
          statusText = statusText.replace(/^"|"$/g, "").trim();
          if (statusText === "Complete") {
            clearInterval(interval);
          }
          setPackageFormRows((currentRows) =>
            currentRows.map((row) =>
              row.packageId === packageId ? { ...row, packageStatus: statusText as PackageStatus } : row
            )
          );
        })
        .catch((error) => {
          console.error("Error:", error);
          clearInterval(interval);
        });
    }, 2000);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/getPackagesRows")
      .then((res) => res.json())
      .then((data) => {
        setPackageFormRows(data);
        data.forEach((packageRow: PackageRow) => pollPackageStatus(packageRow.packageId, packageRow.packageStatus));
      })
      .catch((err) => console.error("Failed to fetch package form rows:", err));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Package List</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-semibold text-gray-600 px-6 py-3">ID</TableHead>
              <TableHead className="font-semibold text-gray-600 px-6 py-3">Package Name</TableHead>
              <TableHead className="font-semibold text-gray-600 px-6 py-3">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packageFormRows.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                <TableCell className="px-6 py-4">
                  <Link href={`/packages/${row.packageId}`} className="text-blue-600 hover:text-blue-800">
                    {row.packageId}
                  </Link>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Link href={`/packages/${row.packageId}`} className="text-gray-800 hover:text-gray-600">
                    {row.packageName}
                  </Link>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Link href={`/packages/${row.packageId}`}>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.packageStatus)}`}>
                      {row.packageStatus}
                    </span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function getStatusColor(status: PackageStatus): string {
  switch (status) {
    case "Preprocessing":
      return "bg-purple-100 text-purple-800";
    case "Detecting Form Boxes with YOLO":
      return "bg-blue-100 text-blue-800";
    case "Analyzing Form Boxes With GPT4o":
      return "bg-indigo-100 text-indigo-800";
    case "Deduplicating Form Fields":
      return "bg-yellow-100 text-yellow-800";
    case "Creating Typeform Form":
      return "bg-orange-100 text-orange-800";
    case "Complete":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
}

}