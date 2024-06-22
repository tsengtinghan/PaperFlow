"use client";
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
import type { PackageRow } from "@/lib/types";

export default function PackageFormList() {
  const [packageFormRows, setPackageFormRows] = useState<PackageRow[]>([]);

  useEffect(() => {
    // Replace '/api/packageFormRows' with your actual API endpoint or local JSON path
    fetch("/fake_data.json")
      .then((res) => res.json())
      .then((data) => setPackageFormRows(data.packageRows))
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
              <Link href={`/packages/${row.packageId}`}>
                {row.packageStatus}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
