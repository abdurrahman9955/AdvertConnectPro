'use client'
import React from 'react';
import { useState, useEffect, ChangeEvent } from 'react';
import Choose3 from '../components/Upload/Choose3';
import Dropdown from '../components/Upload/Dropdown';
import { useRouter } from 'next/navigation';
import { uploadBanner,  } from '../utils/banner';
import Image from 'next/image';
import { FiTrash } from 'react-icons/fi'; 
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Cookies from 'js-cookie';


const Publish2 = ()  => {
  
  const router = useRouter();

  const initialFormData = {
    id: 0,
    mediaType:'',
    mediaUrl:'',
    product:'',
    types: '',
    categories: '',
    phoneNumber: '',
    phoneCode: '',
    price: 0,
    currency: 'USD',
    country: '',
    state: '',
    province: '',
    city: '',
    fullAddress: '',
    emailAddress: '',
    productName: '',
    companyLink: '',
    companyName: '',
    description: '',
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const [formData, setFormData] = useState(initialFormData);

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
 
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     const { name, value } = e.target;
     setFormData({ ...formData, [name]: value });
   };


const handleCountrySelect = (option: { label: string; value: string }) => {
  setFormData({ ...formData, country: option.value });
};

const handleCurrencySelect = (option: { label: string; value: string }) => {
  setFormData({ ...formData, currency: option.label });
};

const resetFormData = () => {
  setFormData(initialFormData);
  setSelectedFiles([]);
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError(null);
  setSuccessMessage(null);
  setLoading(true);

  try {
  
   
      const token = Cookies.get('accessToken');
      if (!token) {
        router.push('/Sign_In');
        return null; 
      }
    

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, String(value));
    });


    selectedFiles.forEach((file) => {
      formDataToSend.append('images', file);
    });


    const uploadResponse = await uploadBanner(formDataToSend);

    if (!uploadResponse.success) {
      alert('Failed to upload banner.');
      return;
    }

    setSuccessMessage('Product uploaded successfully!');
    setSelectedFiles([]);
    resetFormData();
    setLoading(false);
    router.push('/');
  } catch (error) {
    console.error('Error creating product:', error);
    setError('Failed to upload product. Please try again later.');
    setLoading(false);
  }
};

if (loading) {
  return <div className='flex justify-center p-10'>
  <div className='flex  gap-2 flex-col font-bold text-xl md:text-3xl pt-10 '>
    <Image src='/giphy.gif' alt='loading' 
  width={500} height={500} 
  className='flex justify-center  mb-10 border-4 border-black'/>
  <p className='justify-center '>please wait for the moment!</p>
<p className='justify-center'> we are now publishing your banner.</p>
</div>
{successMessage && ( <p className='flex justify-center text-green-500 text-2xl m-5'>{successMessage}</p>)}
</div>

}


  return (
    <div className='   py-10 border-4 border-purple-950' >
      <div >
        <h1 className='flex justify-center md:text-2xl text-lg text-blue-950 font-family-bold
         font-bold'>upload & publish your banner </h1>
      </div >
        
      <form onSubmit={handleSubmit}>

      <Dropdown
          onSelectProduct={(product:any) => setFormData({ ...formData, product:product  })}
          onSelectType={(type:any) => setFormData({ ...formData, types: type })}
          onSelectCategory={(category:any) => setFormData({ ...formData, categories: category })}
        />

        <div className='flex justify-center'>
         <span className='lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2 
          mt-5 font-bold text-blue-950 p-2 bg-white h-10
          border-2 border-blue-950  text-sm '>
           <PhoneInput
          international
          name='phoneNumber'
          defaultCountry="US"
          //@ts-ignore
          value={formData.phoneNumber}
          //@ts-ignore
          onChange={(phone: string) => setFormData({ ...formData, phoneNumber: phone })}
          inputProps={{
          className: 'custom-style', 
          placeholder: 'Enter phone number',
          }}
          style={{outline:'node'}}
          />
         </span>
      </div> 

      <div className='flex justify-center'>
         <span className='lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2
          h-auto 
          mt-5 font-bold text-blue-950
          border-2 border-blue-950  text-sm bg-white
          '
         >   <Choose3 onSelect={handleCountrySelect} /> 
         </span>
      </div>

      <div className='flex justify-center'>
     <button type='button' 
       className='flex justify-between lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 
       max-sm:w-full max-sm:mx-2 h-auto mt-5  text-2xl 
          text-blue-950 font-bold
       bg-white text-left 
        border-2 border-blue-950' >
       
       <input type='text'
        id="productId"
        name='state'
        value={formData.state}
        onChange={handleInputChange}
       placeholder='state capital'
       className=' w-full text-sm  p-1 
        focus:outline-none bg-white text-left 
        text-blue-950' />
       
     </button>
      </div>

      <div className='flex justify-center'>
     <button type='button' 
       className='flex justify-between lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 
       max-sm:w-full max-sm:mx-2 h-auto mt-5  text-lg
          text-blue-950 font-bold
       bg-white text-left 
        border-2 border-blue-950' >
       
       <input type='text'
       name='province'
       value={formData.province}
       onChange={handleInputChange}
       placeholder='province'
       className=' w-full text-sm  p-1 
        focus:outline-none bg-white text-left 
        text-blue-950' />
       
     </button>
      </div>

      <div className='flex justify-center'>
      <label  className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5
       max-sm:w-full max-sm:mx-2 h-10 mt-5  text-lg
         p-2  text-blue-950 font-bold
         text-left 
        '
      > city/town *</label>
      </div>

      <div className='flex justify-center'>
      <input type='text'
       name='city'
       style={{ background: 'aqua' }}
       value={formData.city}
       onChange={handleInputChange}
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2
       h-7  text-sm text-blue-950 font-bold
         p-2 focus:outline-none
        text-left rounded-xl
        border-b-4 border-blue-950' />
      </div>

      <div className='flex justify-center'>
      <label  className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5
       max-sm:w-full max-sm:mx-2 h-10 mt-5  text-lg
         p-2  text-blue-950 font-bold
         text-left 
        '
      > your full address *</label>
      </div>

      <div className='flex justify-center'>
      <input type='text'
       name='fullAddress'
       style={{ background: 'aqua' }}
       value={formData.fullAddress}
       onChange={handleInputChange}
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2 h-7
        text-sm
         p-2 focus:outline-none rounded-xl
         text-left 
        border-b-4 border-blue-950' />
      </div>

      <div className='flex justify-center'>
      <label  className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5
       max-sm:w-full max-sm:mx-2 h-10 mt-5  text-lg 
         p-2  text-blue-950 font-bold
         text-left 
        '
      >your Email, optional *</label>
      </div>

      <div className='flex justify-center'>
      <input type='text'
        name='emailAddress'
        style={{ background: 'aqua' }}
        value={formData.emailAddress}
        onChange={handleInputChange}
        className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2
        h-7 text-sm focus:outline-none
         p-2  rounded-xl
         text-left 
        border-b-4 border-blue-950' />
      </div>
       
      <div className='flex justify-center'>
      <label  className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5
       max-sm:w-full max-sm:mx-2 h-10 mt-5  text-lg
         p-2  text-blue-950 font-bold
         text-left 
        '
      >name of your product *</label>
      </div>

      <div className='flex justify-center'>
      <input type='text'
        name='productName'
        style={{ background: 'aqua' }}
        value={formData.productName}
        onChange={handleInputChange}
        className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2
        h-7  text-sm focus:outline-none
         p-2  rounded-xl
         text-left 
        border-b-4 border-blue-950' />
      </div>

      <div className='flex justify-center'>
      <label  className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5
       max-sm:w-full max-sm:mx-2 h-10 mt-5  text-lg
         p-2  text-blue-950 font-bold
         text-left 
        '
      > your link here, optional *</label>
      </div>

      <div className='flex justify-center'>
      <input type='text'
        name='companyLink'
        style={{ background: 'aqua' }}
        value={formData.companyLink}
        onChange={handleInputChange}
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2 h-7  
        text-sm
         p-2 focus:outline-none rounded-xl
         text-left 
        border-b-4 border-blue-950' />
      </div>
       
      <div className='flex justify-center'>
      <label  className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5
       max-sm:w-full max-sm:mx-2 h-10 mt-5  text-lg 
         p-2  text-blue-950 font-bold
         text-left 
        '
      >Company Or Business Name *</label>
      </div>

      <div className='flex justify-center'>
      <input type='text'
        name='companyName'
        style={{ background: 'aqua' }}
        value={formData.companyName}
        onChange={handleInputChange}
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2 h-7 
         text-sm
         p-2 focus:outline-none rounded-xl
         text-left 
        border-b-4 border-blue-950' />
      </div>

      <div className='flex justify-center'>
      <textarea
       name='description'
       value={formData.description}
       onChange={handleInputChange}
       placeholder='write a description about your product'
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2 h-60 mt-5 
        text-sm
        focus:outline  p-2
        focus:ring-blue-950 bg-white text-left 
        border-2 border-blue-950' />
      </div>
      


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
      bg-blue-900 hover:bg-blue-700 text-white font-bold text-sm  py-1 px-4 rounded-full">
       <h1 className='flex justify-center'>
        Choose Banner
        </h1>
      </label>


      <div className="flex overflow-x-auto mt-5">
        {selectedFiles.map((file, index) => (
          <div key={index} className="relative flex-shrink-0">
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              width={300}
              height={300}
              className=' border border-black rounded-lg m-2 h-44 max-sm:w-48 '
            />

            <span
              onClick={() => handleDelete(index)}
              className="absolute top-2 right-2 m-3 p-2 bg-red-600 text-white rounded-full"
            >
             <FiTrash />
            </span>
          </div>
        ))}
      </div>
     
     </div>
    </div>
     
  
      <div className='flex justify-center'>
      <button type='submit' className='
      lg:w-2/5 max-lg:w-2/3 max-md:w-4/5  h-7
       text-slate-50 bg-blue-950 mt-5
      hover:bg-blue-800 rounded-full max-sm:w-4/5  
      text-sm '>{loading ? 'publishing...' : 'publish your product'}</button>
      </div>
      </form>

     {error && <p className='flex justify-center text-red-500 text-sm m-5'>{error}</p>} 
      
      {successMessage && ( <p className='flex justify-center text-green-500 text-sm m-5'>{successMessage}</p>)}
      
    </div>
  )
}

export default Publish2

