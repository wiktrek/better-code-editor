'use client';
import Image from 'next/image';

export default function Home() {
  function openfile() {

  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <button onClick={openfile}>open file</button>
      </div>
    </main>
  );
}
