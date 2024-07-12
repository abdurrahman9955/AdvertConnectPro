import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaWhatsapp, FaTelegram, FaLinkedin, FaPinterest } from 'react-icons/fa';
import { FaShareNodes } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import Cookies from 'js-cookie';

interface ProductSharingProps {
  productName: string;
  productUrl: string;
  productImageUrl: string; 
}

const SharingImages: React.FC<ProductSharingProps> = ({ productName, productUrl, productImageUrl }) => {
  const [showSharingImages, setShowSharingImages] = useState(false);

  const  closeShare = ()=> {
    setShowSharingImages(false);  
   };

  const updateMetaTags = () => {
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', productName);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', 'Description of the product');
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', productUrl);
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', productImageUrl);
  };

  const shareOnSocialMedia = (platform: string) => {
    updateMetaTags(); 
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}&quote=${encodeURIComponent(productName)}&media=${encodeURIComponent(productImageUrl)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(productName)}&via=yourTwitterHandle&hashtags=yourHashtags`);
        break;
      case 'instagram':
        window.open(`https://www.instagram.com/share?url=${encodeURIComponent(productUrl)}&title=${encodeURIComponent(productName)}&media=${encodeURIComponent(productImageUrl)}`);
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(productName)}&body=${encodeURIComponent(productUrl)}`;
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(productName)}%20${encodeURIComponent(productUrl)}%20${encodeURIComponent(productImageUrl)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(productName)}&media=${encodeURIComponent(productImageUrl)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(productUrl)}&title=${encodeURIComponent(productName)}&summary=Description of the product&source=yourLinkedInHandle`);
        break;
      case 'pinterest':
        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(productUrl)}&description=${encodeURIComponent(productName)}&media=${encodeURIComponent(productImageUrl)}`);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <FaShareNodes onClick={() => setShowSharingImages(!showSharingImages)} />
      {showSharingImages && (
        <div className="fixed bg-slate-200 flex justify-between p-4 gap-5 flex-wrap 
        border-2 border-slate-950
        top-0 left-0 w-auto h-auto">

          <button className='flex flex-1'
          onClick={closeShare}>
          <FaRegWindowClose size={30} color='dark' />
          </button>

          <button 
          onClick={() => shareOnSocialMedia('facebook')}><FaFacebook size={30} color='darkblue' /></button>

          <button 
          onClick={() => shareOnSocialMedia('twitter')}><FaTwitter size={30} color='darkcyan'/></button>

          <button 
          onClick={() => shareOnSocialMedia('instagram')}><FaInstagram size={30} color='darkred'/></button>

          <button 
          onClick={() => shareOnSocialMedia('email')}><FaEnvelope size={30} color='darkred'/></button>

          <button 
          onClick={() => shareOnSocialMedia('whatsapp')}><FaWhatsappSquare  size={30} color='darkgreen'/></button>

          <button 
          onClick={() => shareOnSocialMedia('telegram')}><FaTelegram size={30} color='Blue'/></button>

          <button 
          onClick={() => shareOnSocialMedia('linkedin')}><FaLinkedin size={30} color='darkblue'/></button>

          <button 
          onClick={() => shareOnSocialMedia('pinterest')}><FaPinterest size={30} color='darkred'/></button>

        </div>
      )}
    </div>
  );
};

export default SharingImages;
