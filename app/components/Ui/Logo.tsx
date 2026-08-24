import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <div className="flex items-center justify-center p-4 bg-neutral-800">
      <Link href="/">
        <Image
          src="/logo.png"
          alt=""
          width={200}
          height={200}
          className="w-15 mx-auto"
        />
      </Link>
    </div>
  );
}
