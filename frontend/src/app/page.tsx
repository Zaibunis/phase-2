import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
         <Link href="/login">
              <button className="px-8 h-12 text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all">
                Start for Free 
              </button>
            </Link>
    </div>
  );
}
