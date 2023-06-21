'use client';
import { invoke } from '@tauri-apps/api/tauri';
export default async function Page({ params }: { params: { file: string } }) {
  const { file } = params;

  const path = file.replaceAll('%3A', ':').replaceAll('%26', '/');

  const file_text: string = await invoke('open_file', {
    path: path,
  });
  return <div>file: {path}</div>;
}
