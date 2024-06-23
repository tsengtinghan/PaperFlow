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

  // Placeholder function for showing notifications
  // Poll package status for packages not yet complete
  const pollPackageStatus = (packageId: string, initialStatus: string) => {
    if (initialStatus === "Complete") {
      return; // No need to poll if already complete
    }
  
    const interval = setInterval(() => {
      fetch(`http://127.0.0.1:8000/getPackageStatus?packageId=${packageId}`)
        .then((response) => response.text())
        .then((statusText) => {
          statusText = statusText.replace(/^"|"$/g, "").trim();
          if (statusText === "Complete") {
            clearInterval(interval);
          }
          // Always update state to trigger re-render even if the status might not have changed
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
  

  // Fetch initial package rows and setup polling for those not complete
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Package Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {packageFormRows.map((row, index) => (
          <TableRow key={index}>
            <Link href={`/packages/${row.packageId}`}>
              <TableCell>{row.packageId}</TableCell>
            </Link>
            <TableCell>
              <Link href={`/packages/${row.packageId}`}>{row.packageName}</Link>
            </TableCell>
            <TableCell>
              <Link href={`/packages/${row.packageId}`}>{row.packageStatus}</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
