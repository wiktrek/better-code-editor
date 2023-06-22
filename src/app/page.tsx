'use client';
import Image from 'next/image';
import { invoke } from '@tauri-apps/api/tauri';
import Link from 'next/link';
import { useState } from 'react';
export default function Home() {
  const [link, setLink] = useState('');
  async function generate_link(e: React.ChangeEvent<HTMLInputElement>) {
    const path = e.currentTarget.value;
    let exists = await invoke('check_file', {
      path: path.replaceAll('\\', '/'),
    });
    if (exists === false) return;
    let l = '/api/' + path.replaceAll('\\', '&').replaceAll('/', '&');
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
