import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="p-2 border border-gray-300 rounded-lg  focus:outline-none">
        <Link href={"/"}>Home</Link>
        </div>
      </div>
    </nav>
  );
}
