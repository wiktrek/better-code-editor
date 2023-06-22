'use client';
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
export default async function Page({ params }: { params: { file: string } }) {
  const [input, setInput] = useState('');
  const [prevkey, setPrevkey] = useState('');
  const { file } = params;
  const path = file.replaceAll('%3A', ':').replaceAll('%26', '/');

  setInput(
    await invoke('open_file', {
      path: path,
    })
  );
  function writeFile(path: string, text: string) {
    console.log('a' + path + text);
    // path: string, text: string
    // invoke('write_file', { path: path, text: text})
  }
  function getKey(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    const key = event.key;
    if (key === 's' && prevkey === 'Control') {
      writeFile(path, event.currentTarget.value);
    }
    setPrevkey(key);

    console.log(event.currentTarget.value + 'key: ' + event.key);
  }
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
        <textarea
          className=" bg-black"
          rows={50}
          cols={220}
          id="text"
          onKeyDown={getKey}
        >
          {input}
        </textarea>
      </div>
    </>
  );
}
