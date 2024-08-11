"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { IoMdNotifications } from "react-icons/io";
import Image from "next/image";
import { useState } from "react";

interface PageType {
  page: string;
}

const alerts = {
  alerts: [
    [
      "Engine",
      "Speed",
      "Overshooting",
      3,
      ["2006-08-10", "2006-08-11", "2006-08-12"], 
      [1520, 1120, 1424], 
    ],
    [
      "Fuel",
      "Speed",
      "Overshooting",
      3,
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
    <div className=" w-full h-16 bg-yellow-500 flex items-center md:text-lg text-sm font-semibold relative">
      <section className="h-full w-[20%] max-w-[400px] min-w-[100px] flex justify-center items-center">
        <Image src={'/bulldozer.png'} width={40} height={40} alt="logo" />
      </section>
      <section className="w-[40%] h-full flex justify-center md:gap-10 gap-4 items-center">
        <Link href={'/dashboard'} className={`${page === 'dashboard' ? 'underline' : ''}`}>Home</Link>
        <Link href={'/AddVehicle'} className={`${page === 'predict' ? 'underline' : ''}`}>Add Vehicle</Link>
      </section>
      <section className="w-[40%] h-full flex justify-center gap-10 items-center">
        <Button className="bg-yellow-400 text-amber-600 font-bold hover:bg-yellow-300" onClick={Logout}>Logout</Button>
        <div className="relative">
          <IoMdNotifications className="text-2xl text-yellow-600 cursor-pointer hover:text-yellow-700" onClick={toggleDropdown} />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {alerts.alerts.length > 0 ? (
                alerts.alerts.map((alert, index) => (
                  <div key={index} className="p-4 border-b border-gray-200">
                    <div className="font-semibold text-gray-800">{alert[0]}</div>
                    <div className="text-sm text-gray-600">
                      {alert[1]}: {alert[2]}
                    </div>
                    {typeof alert[3] === 'number' && alert[3] > 0 && (
                      <div className="mt-2 text-red-600 font-bold">
                        Alert Count: {alert[3]}
                      </div>
                    )}
                    {Array.isArray(alert[4]) && (
                      <div className="text-xs text-gray-500">
                        Dates: {alert[4][0]}
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
      </section>
    </div>
  );
}

export default Navigation;
