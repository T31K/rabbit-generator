'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowBigDownDash } from 'lucide-react';
import { useToImage } from '@hcorta/react-to-image';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [droppedImage, setDroppedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const fileUrl = URL.createObjectURL(acceptedFiles[0]);
      setDroppedImage(fileUrl);
    }
  };

  const { ref, isLoading, getPng } = useToImage({ width: 520, height: 520 });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <>
      <main className="flex flex-col items-center justify-center h-[90vh] p-4 bg-gray-200">
        <div className="w-full max-w-md mx-auto flex items-center justify-center flex-col">
          <h1 className="text-center tracking-tight font-semibold mb-4 text-xl text-slate-600">Make your own</h1>
          <Image
            src="/logo.png"
            width={200}
            height={500}
            alt="Picture of the author"
          />
        </div>
        <div
          className="relative mt-5"
          ref={ref}
        >
          <Image
            src="/rabbit.png"
            width={500}
            height={500}
            alt="Picture of the author"
          />
          <div
            {...getRootProps()}
            className="bg-black h-[461px] w-[347px] left-[15px] absolute top-[15px] rounded-[30px] flex items-center justify-center overflow-hidden"
            style={{ transform: 'scale(var(--scale-factor, 1))', transformOrigin: 'top left' }}
          >
            <input {...getInputProps()} />
            {droppedImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={droppedImage}
                alt="Dropped"
                style={{ width: '100%', height: '100%' }}
              />
            ) : isDragActive ? (
              <div className="flex flex-col items-center">
                <ArrowBigDownDash
                  className="text-white"
                  size={72}
                />
                <p className="text-white tracking-tight font-medium">Drop your image here</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <ArrowBigDownDash
                  className="text-white"
                  size={72}
                />
                <p className="text-white tracking-tight font-medium">Drop your image here</p>
              </div>
            )}
          </div>
        </div>
        <Button
          onClick={getPng}
          className="mt-4"
        >
          Download Image
        </Button>
        <style
          jsx
          global
        >{`
          @media (max-width: 768px) {
            :root {
              --scale-factor: 0.7; // Adjust this value to scale the black box on smaller screens
            }
          }
        `}</style>
      </main>
      <footer className=" bg-gray-200 mx-auto h-[10vh] flex items-center justify-center">
        <div className="mx-auto w-full flex items-center justify-center">
          <p className="text-sm text-gray-500 sm:text-center dark:text-gray-400 tracking-tight font-semibold">
            Made with ❤️‎ ‎‎ by
            <a
              href="https://github.com/T31k"
              target="_blank"
              className="ml-1 underline text-blue-600"
            >
              T31K
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
