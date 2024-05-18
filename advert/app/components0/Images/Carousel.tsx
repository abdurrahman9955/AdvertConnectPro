import React from 'react';
import Image from 'next/image';
import styles from './Carousel.module.css'; 

const images = [
  '/product5.gif',
  '/product37.gif',
  '/product4.gif',
  '/product15.gif',
  '/product1.gif',
  '/product30.gif',
  '/product3.gif',
  '/product2.gif',
  '/product10.gif',
  '/product13.gif',
  '/product7.gif',
  '/product8.gif',
  '/product9.gif',
 
];

const Carousel = () => {
  return (
    <div className={`${styles.carouselContainer} `}>
      <div className={styles.marquee}>
        {images.map((image, index) => (
          <div key={index} className={styles.imageContainer}>
            <div className='border-4 border-blue-950 rounded mt-1
            '>
            <Image src={image} alt={`Image ${index + 1}`}
             width={400} height={400} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
