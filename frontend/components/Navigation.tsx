"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { IoMdNotifications } from "react-icons/io";
import Image from "next/image";
import { useState } from "react";
import { IoHome } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";



interface PageType {
  page: string;
}

const alerts = {
  alerts: [
    [
      "Engine",
      "Speed",
      "Overshooting",
      "high",
      ["2006-08-10", "2006-08-11", "2006-08-12"], 
      [1520, 1120, 1424], 
    ],
    [
      "Fuel",
      "Water in Fuel",
      "Overshooting",
      "Low",
      ["2006-08-10", "2006-08-11", "2006-08-12"], 
      [1520, 1120, 1424], 
    ],
  ],
};

const Navigation = ({ page }: PageType) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const Logout = () => {
    localStorage.removeItem('Auth');
    router.push('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="text-gray-20000 w-full h-16 bg-gray-200 flex items-center md:text-lg text-sm font-semibold relative ">
      <section className="h-full w-[20%] max-w-[400px] min-w-[100px] flex justify-center items-center">
        <Image src={'/logo.png'} width={120} height={40} alt="logo" />
      </section>
      <section className="w-[40%] h-full flex justify-center md:gap-10 gap-4 items-center">
      </section>
      <section className="w-[40%] h-full flex justify-center gap-10 items-center">
        <Link href={'/dashboard'} className={`${page === 'dashboard' ? 'underline' : ''}`}><IoHome/></Link>
        <Link href={'/AddVehicle'} className={`${page === 'predict' ? 'underline' : ''}`}><FiPlus/></Link>
        <div className="relative">
            <div className=" rounded-full p-1">

          <IoMdNotifications className="text-2xl cursor-pointer" onClick={toggleDropdown} />
            </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {alerts.alerts.length > 0 ? (
                alerts.alerts.map((alert, index) => (
                  <div key={index} className="p-4 border-b border-gray-200">
                    <div className="font-semibold text-gray-800">{alert[0]}</div>
                    <div className="text-sm text-gray-600">
                      {alert[1]}: {alert[2]}
                    </div>
                    {typeof alert[3] === 'string' && (
                      <div className={`mt-2 ${alert[3]=='high'?'text-red-600':'text-yellow-400'} font-bold`}>
                        Alert Priority: {alert[3]}
                      </div>
                    )}
                    {Array.isArray(alert[4]) && (
                      <div className="text-xs text-gray-500">
                        Expected Date of Failure: {alert[4][0]}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 text-gray-600">No alerts</div>
              )}
            </div>
          )}
        </div>
        <Button className="bg-black text-yellow-400 font-bold hover:bg-gray-800" onClick={Logout}>Logout</Button>
      </section>
    </div>
  );
}

export default Navigation;
