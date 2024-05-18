import Link from "next/link"
import { useRouter } from "next/navigation";

const encodePath = (path: string): string => {
  return Buffer.from(path).toString('base64');
};


const Menu = () => {

  const router = useRouter();

  const encodedPath = encodePath('/Feedback');
  

  return (
    
    <nav className="fixed top-16 left-0 px-10  shadow-md z-10 bg-slate-950  border-4 border-slate-300  overflow-y-auto">
        <div className="flex flex-row  " >
                <div className=" overflow-y-auto ">
                <ul className="flex flex-col gap-4  p-2 " >
                  
                <Link href={{pathname:'/'}}>
                 <li className="text-xl" 
                 onClick={() => router.push('/')}>
                <p>Home</p></li></Link>
                 
                <Link href={{pathname:'/Profile'}}>
                 <li className="text-xl" 
                 onClick={() => router.push('/Profile')}>
                 <p>Profile</p></li></Link>
                
                 <Link href={{pathname:'/Upload'}}>
                 <li className="text-xl" 
                 onClick={() => router.push('/Upload')}>
                <p>Upload</p></li></Link>
                
                <Link href={{pathname:'/Settings'}}>
                 <li className="text-xl" 
                 onClick={() => router.push('/Settings')}>
                 <p>Settings</p></li></Link>
              
                 <Link href={{pathname:'/Feedback'}}>
                 <li className="text-xl" 
                 onClick={() => router.push('/Feedback')}>
                 <p>Feedback</p></li></Link>
                
                 <Link href={{pathname:'/contact'}}>
                 <li className="text-xl" 
                 onClick={() => router.push('/contact')}>
                 <p>Contact</p></li></Link>
                
                 <Link href={{pathname:'/Terms'}}>
                 <li className="text-xl" 
                 onClick={() => router.push('/Terms')}>
                 <p>Terms</p></li></Link>
                
                 <Link href={{pathname:'/Privacy'}}>
                 <li className="text-xl" 
                 onClick={() => router.push('/Privacy')}>
                 <p>Privacy</p></li></Link>
                
                 <Link href={{pathname:'/Help'}}>
                 <li className="text-xl" 
                 onClick={() => router.push('/Help')}>
                 <p>Help</p></li></Link>
    
            </ul>
            </div>        
       </div> 
    </nav>
  )
}

export default Menu