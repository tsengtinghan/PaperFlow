import Link from "next/link";
import { FilePlus2, TableProperties } from "lucide-react";
export default function Navbar() {
  return (
    <header className="bg-white sticky top-0 w-full z-10">
      <div className="w-auto h-20 flex items-center justify-center">
        <div className="flex flex-row space-x-16">
          <Link href="/feed">
            <FilePlus2 />
          </Link>
          <Link href="/dashboard">
            <TableProperties />
          </Link>
        </div>
      </div>
    </header>
  );
}