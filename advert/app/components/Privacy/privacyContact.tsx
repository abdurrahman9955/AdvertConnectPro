import React from "react"
import Link from "next/link";

const PrivacyContact = () => {
    return (
      <div className='flex justify-center flex-col  pt-2 w-full font-boldborder-4 border-blue-950 '>
         <div className='flex justify-center'>
           <div className='flex flex-col    lg:w-3/5 md:mb-10 max-lg:w-full font-bold border-8 border-blue-950 pt-5 max-md:w-full m-1   md:text-xl '> 
           <div className="flex justify-between w-full px-2 border-slate-950  gap-4">
           <div className=" shadow-lg w-full bg-blue-950 border-2  h-10 border-slate-950 rounded flex-initial">
           <h1 className='flex justify-center pt-1 font-bold text-white  text-2xl'>Contact Us</h1>
           </div></div><div className='w-full mt-2  border-4 border-blue-950'></div>
           <div className='flex flex-row h-auto overflow-y-auto bg-white p-3'>
           <div className='  w-full gap-4  '>  <div className='bg-white min-h-screen text-2xl'>
          <div>
         <h1>
          
         <p className='text-3xl pt-5 px-5 max-md:text-3xl'>Contact Us</p>

        <p className='p-5'>
        At AdvertConnectPro, we're dedicated to providing exceptional support and assistance to our users. 
        Whether you have questions, concerns, or feedback about our privacy practices or this policy, we're here
        to help. Here's how you can reach out to us:</p>

        <p className='text-3xl pt-5 px-5 max-md:text-3xl'>Multiple Channels for Communication:</p>

        <p className='p-5'>
        We understand that everyone has their preferred method of communication, which is why we offer multiple 
        channels for you to reach out to us. You can contact us via email at 
         
          <h1 className="text-green-600">advertconnectpro@gmail.com</h1>  or 
        directly through our app at
          <Link href={{pathname: '/contact'}} className="text-blue-600 px-4"> 
        advertconnectpro.com/contact </Link> Whether you prefer the convenience of email 
        or the streamlined experience of our in-app messaging system, we're accessible wherever you are.</p>

        <p className='p-5'>
        When contacting us through our app, you'll have access to a comprehensive contact form that allows you 
        to provide detailed information about your inquiry. Simply fill out your name, email address, reason 
        for contacting us, and your statement or message. We encourage you to provide as much information as 
        possible to help us better understand and address your concerns effectively.</p>

        <p className='text-3xl pt-5 px-5 max-md:text-3xl'>Swift and Personalized Response:</p>

        <p className='p-5'>
        Your time is valuable, and we strive to respond to your inquiries as quickly as possible. Upon 
        receiving your message, our dedicated support team will promptly review and address your request with 
        the utmost care and attention. Whether you're seeking assistance, clarification, or resolution, we're 
        committed to providing you with a swift and personalized response tailored to your needs.</p>

        <p className='text-3xl pt-5 px-5 max-md:text-3xl'>User-Centric Approach:</p>

        <p className='p-5'>
        At AdvertConnectPro, your satisfaction and peace of mind are our top priorities. We approach every 
        inquiry with the highest regard for your concerns and needs, ensuring that you receive the support and 
        assistance you deserve. Whether you're seeking information about our privacy practices, reporting an 
        issue, or providing feedback, we're here to serve you with the utmost respect, professionalism, and 
        dedication.</p>

        <p className='text-3xl pt-5 px-5 max-md:text-3xl'>Privacy and Communication Preferences:</p>

        <p className='p-5'>
        Your privacy matters to us, which is why we're committed to respecting your communication preferences. 
        When you contact us, we'll use the email address provided specifically to respond to your inquiry or 
        request. Rest assured that we will not use your contact email for promotional communications or any 
        purpose other than addressing your message. Your privacy is our priority, and we handle your information 
        with the utmost care and confidentiality.</p>

        <p className='text-3xl pt-5 px-5 max-md:text-3xl'>Connect with Us on Social Media:</p>

        <p className='p-5'>
        Stay connected with us and receive updates, news, and announcements
         by following us on our social media platforms, 
        including  <Link href={{pathname: '/contact'}} className="text-blue-600 px-4"> 
        Facebook</Link>, <Link href={{pathname: '/contact'}} className="text-blue-600 px-4"> 
        Twitter</Link>,<Link href={{pathname: '/contact'}} className="text-blue-600 px-4"> 
         TikTok</Link>,<Link href={{pathname: '/contact'}} className="text-blue-600 px-4"> 
        Instagram</Link>,and Instagram. While we welcome engagement and 
        interaction on social media, for more urgent or sensitive inquiries,
         we encourage you to reach out to us directly through our app   
        <Link href={{pathname: '/contact'}} className="text-blue-600 px-4"> 
        advertconnectpro.com/contact </Link> or email <h1 className="text-green-600">advertconnectpro@gmail.com</h1> for a faster and more personalized response.</p>

         <p className='p-5'>
         At AdvertConnectPro, we're committed to being accessible, responsive, and supportive to our users. 
         Whether you have questions, feedback, or concerns, we're here to listen, assist, and ensure that your 
         experience with us is nothing short of exceptional. Contact us today and experience the difference of 
         user-centric support and service.</p>

        
     </h1>
     </div>
    </div>
    </div>
  </div>
  </div>
  </div>
  </div>
    )}
 
  export default PrivacyContact;
  
  

  
 