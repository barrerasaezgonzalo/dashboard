import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <div className="flex items-center justify-center p-4">
      <Link href="/">
        <Image
          src="/logo.png"
          alt=""
          width={300}
          height={200}
          className="w-30 mx-auto"
        />
      </Link>
    </div>
  );
}
