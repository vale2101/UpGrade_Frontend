"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <Image src="/UpGrade.png" alt="Logo" width={40} height={40} />
      <span className="text-white font-bold text-lg">
        Up<span className="text-gray-300">Grade</span>
      </span>
    </Link>
  );
}
