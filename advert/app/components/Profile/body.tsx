'use client'
import React, { useState, useEffect,ChangeEvent } from 'react';
import Image from 'next/image';
import { FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import { uploadProfileImage, updateProfileImage, getProfileImage, deleteProfileImage } from '@/app/utils/profile';


const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);


  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found');
        }
        const response = await getProfileImage(); 
        setProfileImage(response.imageUrl as any); 
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };
    fetchProfileImage();
  }, []);  
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
    } 
  };
  
  const handleUpload = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found');
      }
      if (!selectedImage) {
        throw new Error('No image selected');
      }
      const response = await uploadProfileImage(selectedImage);
      console.log(response);
      setProfileImage(null);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleUpdate = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found');
      }
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        throw new Error('No image selected');
      }
      const image = fileInput.files[0];
  
      const response = await updateProfileImage(image);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDelete = async () => {
    try {
      const userId = localStorage.getItem('userId'); 
      if (!userId) {
        throw new Error('User ID not found');
      }
      const response = await deleteProfileImage(); 
      console.log(response);
      setProfileImage(null);
    } catch (error) {
      console.error(error);
    }
  };

 
  return (
    <div className="flex justify-center flex-wrap mb-40 md:pt-10 max-md:pt-0">
      <div className="flex flex-col max-md:w-5/6 max-sm:w-full m-0 max-lg:w-4/6 lg:w-3/6 xl:w-2/6">
        <div className="border-4 border-blue-950 bg-white">
          <h1 className="flex justify-center text-5xl text-blue-950 font-bold pt-5 max-sm:text-xl">My profile </h1>
          <div className="flex justify-center relative">
            <div className="w-80 h-80 mt-10 border-4 border-orange-950 bg-orange-100 rounded-full relative">
              {profileImage ? (
                 <Image
                 src={profileImage}
                 alt="Profile"
                 width={500}
                 height={500}
                 className="w-full h-full object-cover rounded-full"/>

              ) : (
                <>
                  {selectedImage ? (
                    <Image src={URL.createObjectURL(selectedImage)} 
                    alt={'profile preview'}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rounded-full" />

                  ) : (
                    <FaUser className="absolute top-1/2 left-1/2 transform -translate-x-1/2 
                    -translate-y-1/2 w-32 h-32 text-orange-950" />
                  )}
                </>
              )}
              
              <input type="file" accept="image/*"  name="images" 
              onChange={handleFileChange} className="opacity-0 w-full h-full 
              absolute top-0 left-0 cursor-pointer" />

              {selectedImage && (
                <button onClick={handleUpload} className="absolute  bottom-0 right-0 
                bg-blue-500 hover:bg-blue-700  text-white  rounded-full p-1 ">
                  <FaUser className='w-40 h-40' />
                </button>
              )}
              {profileImage && (
                <button onClick={handleDelete} className="absolute bottom-0 right-0
                 bg-red-500 hover:bg-red-700 text-white rounded-full p-1">
                  <FaTrash />
                </button>
              )}
            </div>
          </div>
          <h1 className="flex justify-center text-3xl text-blue-950 mb-10 mt-2 
          font-bold max-sm:text-3xl">UserName</h1>
         
         
          <div className="flex justify-center">
          <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700
             text-white font-bold py-2 px-4  rounded mr-4">
              Update
            </button>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700
             text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
 
 );
};

export default Profile;

