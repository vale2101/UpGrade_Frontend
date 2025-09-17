"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity">
      <Image src="/UpGrade.png" alt="Logo" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
      <span className="text-white font-bold text-sm sm:text-base lg:text-lg">
        Up<span className="text-gray-300">Grade</span>
      </span>
    </Link>
  );
}
