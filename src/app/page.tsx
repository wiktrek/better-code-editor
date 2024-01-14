'use client';
import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/dialog';
import { useState } from 'react';
export default function Home() {
  const [error, setError] = useState('');
  async function redirect(path: string) {
    let exists = await invoke('check_file', {
      path: path.replaceAll('\\', '/'),
    });
    if (exists === false) return setError("Error: file doesn't exist");
    if (exists === true) setError('');

    let l = '/api/file/' + path.replaceAll('\\', '&').replaceAll('/', '&');
    return window.location.replace('http://localhost:3000' + l);
  }
  async function open_dialog() {
    await open({
      multiple: false,
    }).then(async (path) => {
      console.log(path);
      redirect(path as string);
    });
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-background text-text">
      <div className="grid gap-2">
        <button onClick={open_dialog}> open file</button>
        <a className=" text-red-800">{error}</a>
      </div>
    </main>
  );
}
