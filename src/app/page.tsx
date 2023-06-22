'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
export default function Home() {
  const [link, setLink] = useState('');
  function generate_link(e: React.ChangeEvent<HTMLInputElement>) {
    // "http://localhost:3000/api/D:&Users&wiktor&Desktop&projekty&bce&example.file.md"
    let l =
      '/api/' +
      e.currentTarget.value.replaceAll('\\', '&').replaceAll('/', '&');
    console.log(l);
    setLink(l);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input className="text-white bg-black" onChange={generate_link}></input>
      <div>
        <Link href={link}>open file</Link>
      </div>
    </main>
  );
}
