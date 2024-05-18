'use client'
import React, { useState, ChangeEvent } from 'react';
import { uploadBanner, deleteBanner } from '../utils/banner';
import Image from 'next/image';
import { FiTrash } from 'react-icons/fi'; 
import { useRouter } from 'next/navigation';

interface BannerUploadProps {
  onUploadComplete: () => void; 

}

const BannerUpload: React.FC<BannerUploadProps> = ({ onUploadComplete}) => {

  const router = useRouter();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (files) {
      setSelectedFiles([...selectedFiles, ...Array.from(files)]);
    }
  };

  const handleDelete = (index: number) => {
    const files = [...selectedFiles];
    files.splice(index, 1);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    try {

      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/Sign_In');
        return;
      }

      if (selectedFiles.length === 0) {
        alert('Please select at least one file.');
        return;
      }
  
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('images', file);
      });
  
      const response = await uploadBanner(formData);
      if (!response.success) {
        alert('Failed to upload images.');
        return;
      }
  
      alert('All images uploaded successfully.');
      setSelectedFiles([]);
      onUploadComplete();
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <div className='flex flex-col'>
      <input
        type="file"
        onChange={handleFileChange}
        multiple
        name="images"
        id="file-input"
        className="hidden"
      />

      <label htmlFor="file-input" className="cursor-pointer  mx-10 
      bg-blue-900 hover:bg-blue-700 text-white font-bold  py-2 px-4 rounded-full">
       <h1 className='flex justify-center'>
        Choose Photos
        </h1>
      </label>


      <div className="flex overflow-x-auto mt-5">
        {selectedFiles.map((file, index) => (
          <div key={index} className="relative flex-shrink-0">
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              width={500}
              height={500}
              className=' border border-black rounded-lg m-2 h-60 '
            />

            <button
              onClick={() => handleDelete(index)}
              className="absolute top-2 right-2 m-3 p-2 bg-red-600 text-white rounded-full"
            >
             <FiTrash />
            </button>
          </div>
        ))}
      </div>
     

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="w-60 h-10
          text-slate-50 bg-blue-950
          hover:bg-blue-800 rounded-full max-sm:w-40 text-lg"
          onClick={handleUpload}
        >
          Upload Banners
        </button>
      </div>

     </div>
    </div>
  );
};

export default BannerUpload;


