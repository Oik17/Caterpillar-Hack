"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface PageType{
    page:String
}

const Navigation = ({page}:PageType) => {
    const router = useRouter();
    const Logout=()=>{
        localStorage.removeItem('Auth');
        router.push('/')
    }
    return ( 
        <div className="w-full h-20 border-b-8 border-yellow-400 flex items-center md:text-lg text-sm font-semibold">
            <section className="h-full w-[20%] max-w-[400px] min-w-[100px] flex justify-center items-center">
                <span>Logo</span>
            </section>
            <section className="w-[60%] h-full flex justify-center gap-10 items-center">
                <Link href={'/dashboard'} className={`${page==='dashboard'?'underline':''}`}>Home</Link>
                <Link href={'/predict'} className={`${page==='predict'?'underline':''}`}>Predict Components</Link>
            </section>
            <section className="w-[20%] h-full flex justify-center gap-10 items-center">
                <Button className="bg-yellow-400 text-amber-600 font-bold hover:bg-yellow-300" onClick={Logout}>Logout</Button>
            </section>
        </div>
     );
}
 
export default Navigation;