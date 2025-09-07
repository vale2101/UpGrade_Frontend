import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/UpGrade.png" alt="Logo" width={40} height={40} />
      <span className="text-white font-bold text-lg">
        Up<span className="text-gray-300">Grade</span>
      </span>
    </div>
  );
}
