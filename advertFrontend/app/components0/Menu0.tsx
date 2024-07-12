import { useRouter } from "next/navigation"
import Link from "next/link";

const Menu0 = () => {

  const router = useRouter();

  return (
    <nav className="fixed top-14 left-0 px-5  shadow-md z-10 bg-slate-950  border-2 border-slate-300  overflow-y-auto">
        <div className="flex flex-row  " >
                <div className=" overflow-y-auto ">
                <ul className="flex flex-col lg:flex-row lg:h-12 pt-2  
                 gap-2  p-2 " >

                <Link href={{pathname:'/'}}>
                 <li className="text-sm" >
                <p>Home</p></li></Link>
                
                <Link href={{pathname:'/Profile'}}>
                 <li className="text-sm" >
                 <p>Profile</p></li></Link>
                
                 <Link href={{pathname:'/Upload'}}>
                 <li className="text-sm" >
                <p>Upload</p></li></Link>
                
                <Link href={{pathname:'/Settings'}}>
                 <li className="text-sm" >
                 <p>Settings</p></li></Link>
                
                 <Link href={{pathname:'/Feedback'}}>
                 <li className="text-sm" >
                 <p>Feedback</p></li></Link>
                 
                 <Link href={{pathname:'/contact'}}>
                 <li className="text-sm" >
                 <p>Contact</p></li></Link>
               
                 <Link href={{pathname:'/Terms'}}>
                 <li className="text-sm" >
                 <p>Terms</p></li></Link>
                
                 <Link href={{pathname:'/Privacy'}}>
                 <li className="text-sm" >
                 <p>Privacy</p></li></Link>
                
                 <Link href={{pathname:'/Help'}}>
                 <li className="text-sm" >
                 <p>Help</p></li></Link>

              </ul>
            </div>
                          
       </div>
    </nav>
  )
}

export default Menu0

