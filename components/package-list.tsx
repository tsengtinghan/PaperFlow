'use client'
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {PackageRow} from '@/lib/types';

export default function PackageFormList() {
    const [packageFormRows, setPackageFormRows] = useState<PackageRow[]>([]);

  useEffect(() => {
    // Replace '/api/packageFormRows' with your actual API endpoint or local JSON path
    fetch('/fake_data.json')
      .then(res => res.json())
      .then(data => setPackageFormRows(data.packageRows))
      .catch(err => console.error('Failed to fetch package form rows:', err));
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Package Name</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {packageFormRows.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.packageId}</TableCell>
            <TableCell>{row.packageName}</TableCell>
            <TableCell>{row.packageStatus}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
