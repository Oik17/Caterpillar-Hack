"use client";

import Navigation from "@/components/Navigation";
import { VehicleCard } from "@/components/VehicleCard";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("Auth");
      try {
        const response = await axios.get(
          "https://caterpillar-hack-production.up.railway.app/products/getByUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="h-full w-full">
        <Navigation page={"dashboard"} />
      </div>
      <div className="overflow-y-auto h-[700px] scrollbar flex flex-col justify-center items-center md:ml-10">
        <div className="h-10 items-start w-[62%]">
          <span className="text-4xl font-bold md:mt-4 mt-2 text-yellow-500">
            Your Vehicles{" "}
          </span>
        </div>
        {vehicles && vehicles.length > 0 ? (
          <div className="w-[62%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 place-items-center mt-6 ">
            {vehicles.map((vehicle, index) => (
              <VehicleCard key={index} data={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-lg text-gray-500">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
