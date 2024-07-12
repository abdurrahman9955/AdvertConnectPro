import React from 'react';
import Image from 'next/image';
import styles from './Carousel.module.css'; 

const images = [
  '/advert32.jpg',
  '/advert10.jpg',
  '/advert34.jpg',
  '/advert23.jpg',
  '/advert35.png',
  '/advert5.jpg',
  '/advert2.jpg',
  '/advert9.jpg',
  '/advert36.jpg',
  '/advert25.jpg',
  '/advert30.jpg',
  '/advert33.jpg',
  '/advert20.jpg',
 
];

const Carousel = () => {
  return (
    <div className={`${styles.carouselContainer} `}>
      <div className={styles.marquee}>
        {images.map((image, index) => (
          <div key={index} className={styles.imageContainer}>
            <div className='border-2 border-blue-950 rounded-sm mt-1 -mx-1 
           
            '>
            <Image src={image} alt={`Image ${index + 1}`}
             width={270} height={270} className='max-md:w-20 max-md:h-20 '/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
