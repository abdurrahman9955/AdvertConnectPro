import React from "react"


const PrivacyInfo = () => {
    return (
      <div className='flex justify-center flex-col  pt-2 w-full font-boldborder-4 border-blue-950 '>
         <div className='flex justify-center'>
           <div className='flex flex-col    lg:w-3/5 md:mb-10 max-lg:w-full font-bold border-8 border-blue-950 pt-5 max-md:w-full m-1   md:text-xl '> 
           <div className="flex justify-between w-full px-2 border-slate-950  gap-4">
           <div className=" shadow-lg w-full bg-blue-950 border-2  h-10 border-slate-950 rounded flex-initial">
           <h1 className='flex justify-center pt-1 font-bold text-white  text-2xl'>Information We Collect</h1>
           </div></div><div className='w-full mt-2  border-4 border-blue-950'></div>
           <div className='flex flex-row h-auto overflow-y-auto bg-white p-3'>
           <div className='  w-full gap-4  '>  <div className='bg-white min-h-screen text-2xl'>
          <div>
         <h1>
         <p className='text-3xl pt-5 px-5 max-md:text-3xl'>
        Information We Collect</p>

        <p className='p-5'>
        At AdvertConnectPro, we are committed to providing a transparent and secure experience for our users.
        To deliver our services effectively and enhance your interaction with our platform, we collect various
        types of information, including:</p>

     <p className='text-3xl pt-5 px-5 max-md:text-3xl'>
     Personal Information:</p>

     <p className='p-5'>
     When you register an account with AdvertConnectPro, we may request certain personal details from you to
     create and personalize your account. This includes:</p>

     <p className='text-3xl pt-5 px-5 max-md:text-3xl'>
     Name: </p>

     <p className='p-5'>
     Your full name, which helps us address you properly and personalize your experience.
     Email Address: A valid email address is essential for account verification, communication purposes, and account recovery.
     Profile Picture: Optionally, you can upload a profile picture to personalize your account and enhance user engagement.
     To ensure the security of your account and maintain the integrity of our platform, we encrypt and 
     securely store all personal information provided during registration. Additionally, we implement 
     email verification through a one-time password (OTP) sent to your registered email address, ensuring 
     that only authorized users can access their accounts.</p>

     <p className='text-3xl pt-5 px-5 max-md:text-3xl'>
     User-Generated Content:</p>

      <p className='p-5'>
      AdvertConnectPro empowers users to showcase their products and engage with the community through 
      various forms of user-generated content, including:</p>

       <p className='text-3xl pt-5 px-5 max-md:text-3xl'>
       Videos:</p> 
       <p className='p-5'>
       Users can upload videos to promote their products or share engaging content with our community.
       Images: High-quality images play a crucial role in product visibility and user engagement. Users can upload images to accompany their product listings.
       Banners: Eye-catching banners serve as visual cues for promotions and advertisements. Users have the option to create and upload banners to enhance their product visibility.
       All user-generated content is stored securely on our servers, utilizing Amazon RDS and Amazon 
       S3 for efficient data management and retrieval.</p>

       <p className='text-3xl pt-5 px-5 max-md:text-3xl'>
       Device Information:</p>
       <p className='p-5'>
       To optimize your experience on AdvertConnectPro and ensure compatibility across various devices, 
       we may collect certain device-related information, including:</p>

       <p className='text-3xl pt-5 px-5 max-md:text-3xl'>
       Device Type: </p>
       <p className='p-5'>
       Identifying the type of device you are using (e.g., smartphone, tablet, desktop) helps us tailor our platform to suit your screen size and capabilities.
       Operating System: Information about your device's operating system (e.g., iOS, Android, Windows) assists us in optimizing app performance and feature availability.
       Unique Device Identifiers: Unique identifiers associated with your device aid in user authentication, session management, and analytics tracking.
       We prioritize user privacy and security, and any device information collected is used solely for 
       internal purposes to improve app functionality and user experience.</p>

       <p className='text-3xl pt-5 px-5 max-md:text-3xl'>
      Usage Data:</p>
      <p className='p-5'>

      Understanding how users interact with our platform is essential for continuous improvement 
      and personalized experiences. Therefore, we may collect usage data to analyze user behavior and 
      preferences, including:</p>

      <p className='text-3xl pt-5 px-5 max-md:text-3xl'>
      Browsing History:</p> 

      <p className='p-5'>

      Information about the pages you visit, products you view, and actions you take within the app helps us understand your interests and tailor content accordingly.
      Preferences: Data on your preferences, such as product categories you engage with frequently, enables us to deliver personalized recommendations and targeted advertisements.
      Interactions with Other Users' Content: Insight into your interactions with other users' content, such as likes, comments, and shares, assists us in enhancing community engagement and fostering meaningful connections.
      We are committed to protecting your privacy and utilize industry-standard practices to anonymize 
      and aggregate usage data for analytics and personalization purposes, without compromising individual 
      user identities.</p>
          
     </h1>
     </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    )
  }
  
  export default PrivacyInfo;
  
  

  
  