'use client';
import Image from 'next/image';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { ArrowBigDownDash } from 'lucide-react';

export default function Home() {
  const [droppedImage, setDroppedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const fileUrl = URL.createObjectURL(acceptedFiles[0]);
      setDroppedImage(fileUrl);
    }
  };

  const takeScreenshot = async () => {
    try {
      const canvas = await html2canvas(document.body);
      const base64image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = base64image;
      link.download = 'screenshot.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error taking screenshot:', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <main className="py-24 flex flex-col items-center justify-between h-[90vh] ">
      <div className="absolute inset-0 overflow-hidden">
        <div className="jumbo absolute -inset-[10px] opacity-50"></div>
      </div>
      <div>
        <h1 className="text-center tracking-tight mb-3">Make your own</h1>
        <Image
          src="/logo.png"
          width={300}
          height={500}
          alt="Picture of the author"
        />
      </div>
      <div className="relative">
        <Image
          src="/rabbit.png"
          width={500}
          height={500}
          alt="Picture of the author"
        />
        <div className="flex justify-center mt-5">
          <Button
            variant="outline"
            onClick={takeScreenshot}
          >
            Download
          </Button>
        </div>
        <div
          {...getRootProps()}
          className="bg-black h-[458px] w-[347px] left-[15px] absolute top-[16px] rounded-[30px] flex items-center justify-center overflow-hidden"
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
      <div className="h-[50px]"></div>
    </main>
  );
}
