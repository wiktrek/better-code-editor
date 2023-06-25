'use client';
import Image from 'next/image';
import { invoke } from '@tauri-apps/api/tauri';
import Link from 'next/link';
import { useState } from 'react';
export default function Home() {
  const [error, setError] = useState('');

  async function redirect() {
    const path = (document.getElementById('file_path') as HTMLInputElement)
      .value;
    let exists = await invoke('check_file', {
      path: path.replaceAll('\\', '/'),
    });
    if (exists === false) return setError("Error: file doesn't exist");
    if (exists === true) setError('');

    let l = '/api/' + path.replaceAll('\\', '&').replaceAll('/', '&');
    return window.location.replace('http://localhost:3000' + l);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <input
          className="text-white bg-black"
          id="file_path"
          placeholder="file path"
        />
        <a className=" text-red-800">{error}</a>
        <button onClick={redirect}>Open file</button>
      </div>
    </main>
  );
}
