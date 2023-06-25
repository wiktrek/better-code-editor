'use client';
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { redirect } from 'next/navigation';
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
  async function rename() {
    const name = (document.getElementById('rename_input') as HTMLInputElement)
      .value;
    const patharr = path.split('/');
    patharr.pop();
    const str = patharr.join(',').replaceAll(',', '/') + `/${name}`;
    await invoke('rename_file', { path: path, name: str });
    console.log(name + str + window.location);
    return window.location.replace(
      'http://localhost:3000/api/' +
        str.replaceAll('/', '%26').replaceAll(':', '%3A')
    );
  }
  function rename_menu() {
    const editor = document.getElementById('editor');
    const rename_element = document.getElementById('rename');
    if (rename_element != null && editor != null) {
      editor.style.visibility = 'hidden';
      rename_element.style.visibility = 'visible';
    }
  }
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
      <div id="rename" className=" invisible">
        <input
          placeholder="name"
          id="rename_input"
          className="text-white bg-black"
        ></input>
        <button onClick={rename}>rename</button>
      </div>
      <div id="editor" className=" visible">
        <p>file: {path}</p>
        <button className="" onClick={writeFile}>
          Save
        </button>
        <button onClick={rename_menu}>rename</button>
        <textarea className=" bg-black" rows={50} cols={220} id="text" />
      </div>
    </>
  );
}
