import PackageList from "@/components/package-list";
import Navbar from "@/components/navbar";
export default function Dashboard() {
  return (
    <div className="px-36">
      <Navbar />
      <PackageList />
    </div>
  );
}
