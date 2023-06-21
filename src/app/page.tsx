'use client';
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Link href="http://localhost:3000/api/D:&Users&wiktor&Desktop&projekty&bce&example.file.md">
          open file
        </Link>
      </div>
    </main>
  );
}
