'use client';
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
export default async function Page({ params }: { params: { file: string } }) {
  const [prevkey, setPrevkey] = useState('');
  const { file } = params;
  const path = file
    .replace('http://localhost:3000/api/', '')
    .replaceAll('%3A', ':')
    .replaceAll('%26', '/');
  useEffect(() => {
    const open_file = async () => {
      let file: string = await invoke('open_file', {
        path: path,
      });
      console.log(file);
      (document.getElementById('text') as HTMLTextAreaElement).value = file;
    };
    open_file().catch(console.error);
  });

  async function writeFile() {
    let text = (document.getElementById('text') as HTMLTextAreaElement).value;

    console.log('a' + path + text);
    await invoke('write_file', {
      path: path,
      text: text,
    });
    // path: string, text: string
    // invoke('write_file', { path: path, text: text})
  }
  function getKey(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    const key = event.key;
    if (key === 's' && prevkey === 'Control') {
      writeFile();
    }
    setPrevkey(key);

    console.log(event.currentTarget.value + 'key: ' + event.key);
  }
  return (
    <>
      <div>
        <p>file: {path}</p>
        <button className="" onClick={writeFile}>
          Save
        </button>
        <textarea
          className=" bg-black"
          rows={50}
          cols={220}
          id="text"
        ></textarea>
      </div>
    </>
  );
}
