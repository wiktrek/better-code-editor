'use client';
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
export default async function Page({ params }: { params: { file: string } }) {
  const [input, setInput] = useState('');
  const { file } = params;
  const path = file.replaceAll('%3A', ':').replaceAll('%26', '/');

  setInput(
    await invoke('open_file', {
      path: path,
    })
  );

  // useEffect(() => {
  //   const keyDownHandler = (e: any) => console.log(`You pressed ${e.code}.`);
  //   document.addEventListener('keydown', keyDownHandler);

  //   // clean up
  //   return () => {
  //     document.removeEventListener('keydown', keyDownHandler);
  //   };
  // }, []);
  return (
    <>
      <div>
        <p>file: {path}</p>
        <textarea className=" bg-black" rows={50} cols={220}>
          {input}
        </textarea>
      </div>
    </>
  );
}
