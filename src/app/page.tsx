import Image from 'next/image';
import fs from 'fs';
export default function Home() {
  function openfile() {
    fs.readFile(
      'D:/Users/wiktor/Desktop/projekty/bce/readme.md',
      (err, data) => {
        console.log(data);
      }
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <button onClick={openfile}>open file</button>
      </div>
    </main>
  );
}
