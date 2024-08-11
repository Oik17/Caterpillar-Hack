"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { DropdownMenuRadioGroupDemo } from "@/components/Dropdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {};

const formSchema = z.object({
  vehicle_name: z.string().min(1,"Please enter a machine name"),
  machine: z.string().min(1, "Please select a machine"),
  engineTemperature: z.string().min(1, "Temperature is required"),
  engineSpeed: z.string().min(1, "Engine Speed is required"),
  oilPressure: z.string().min(1, "oilPressure is required"),
  fuelTemperature: z.string().min(1, "Fuel Temperature is required"),
  fuelLevel: z.string().min(1, "Fuel Level is required"),
  WaterInFuel: z.string().min(1, "WaterInFuel is required"),
  fuelPressure: z.string().min(1, "Fuel Pressure is required"),
  transmissionPressure: z.string().min(1, "Transmission pressure is required"),
  brakeControl: z.string().min(1, "Brake control is required"),
  pedalSensor: z.string().min(1, "Pedal sensor is required"),
  exhaustGasTemperature: z
    .string()
    .min(1, "Exhaust gas temperature is required"),
  airFilterPressure: z.string().min(1, "Air filter pressure is required"),
  systemVoltage: z.string().min(1, "System voltage is required"),
  hydraulicPumpRate: z.string().min(1, "Hydraulic pump rate is required"),
});

export const PredictForm = ({}: Props) => {
  const [dataFromChild, setDataFromChild] = useState("");
  const [position, setPosition] = React.useState("select");
  const handleDataFromChild = async (data: string) => {
    setDataFromChild(data);
    console.log(data);
    // console.log(dataFromChild)
  };

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicle_name:"",
      machine: "",
      engineTemperature: "",
      engineSpeed: "",
      oilPressure: "",
      fuelTemperature: "",
      fuelLevel: "",
      WaterInFuel: "",
      fuelPressure: "",
      transmissionPressure: "",
      brakeControl: "",
      pedalSensor: "",
      exhaustGasTemperature: "",
      airFilterPressure: "",
      systemVoltage: "",
      hydraulicPumpRate: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = {
        machine: position,
        components: {
          engine: {
            engineTemperature: Number(values.engineTemperature),
            engineSpeed: Number(values.engineSpeed),
            oilPressure: Number(values.oilPressure),
          },
          fuel: {
            WaterInFuel: Number(values.WaterInFuel),
            fuelLevel: Number(values.fuelLevel),
            fuelPressure: Number(values.fuelPressure),
            fuelTemperature: Number(values.fuelTemperature),
          },
          drive: {
            transmissionPressure: Number(values.transmissionPressure),
            brakeControl: Number(values.brakeControl),
            pedalSensor: Number(values.pedalSensor),
          },
          misc: {
            exhaustGasTemperature: Number(values.exhaustGasTemperature),
            airFilterPressure: Number(values.airFilterPressure),
            systemVoltage: Number(values.systemVoltage),
            hydraulicPumpRate: Number(values.hydraulicPumpRate),
          },
        },
      };
      console.log(data);

      const token = localStorage.getItem("Auth");

      const response = await axios.post(
        "https://caterpillar-hack-production.up.railway.app/products/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Request successful:", response.data);
      toast.success("Successful");
      
    } catch (error: AxiosError | any) {
      console.error("Request failed:", error);
      toast.error(error.message);
    }
  }

  return (
    <div className="w-full flex justify-center">
      {/* <span className="text-2xl bg-yellow-300 p-2 rounded-md w-full">
        Machine
      </span> */}
      <Toaster position="top-center" richColors />
      <div className="w-[80%]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 flex flex-col"
          >
            <div className="flex items-center gap-2 md:mt-10 mt-2">

            <span className="text-xl underline decoration-yellow-400">
                Machine Name :
              </span>
              
                <FormField
                  control={form.control}
                  name="vehicle_name"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Machine name</FormLabel> */}
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="machine name"
                          {...field}
                          className="md:md:w-[300px] w-[200px] "
                        />
                      </FormControl>
                      {/* <FormDescription>This is your email.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <FormField
              control={form.control}
              name="machine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Machine: </FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="md:w-[300px] bg-yellow-200 hover:bg-yellow-100"
                        >
                          {position || "Select a machine"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Select Machine</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={position}
                          onValueChange={(value) => {
                            setPosition(value); // Update local state
                            form.setValue("machine", value); // Update form state
                            form.trigger("machine"); // Validate machine field
                          }}
                        >
                          <DropdownMenuRadioItem value="Excavator">
                            Excavator
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="Articulated Truck">
                            Articulated Truck
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="Backhoe Loader">
                            Backhoe Loader
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="Dozer">
                            Dozer
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="text-2xl bg-yellow-300 p-2 rounded-md">
              Components
            </span>
            <div className="border-2 p-8 rounded-xl">
              <span className="text-xl underline decoration-yellow-400">
                Engine
              </span>
              <div className="grid md:grid-cols-2 md:place-items-center ">
                <FormField
                  control={form.control}
                  name="engineTemperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Engine Temperature </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="temperature"
                          {...field}
                          className="md:md:w-[300px] w-[200px] "
                        />
                      </FormControl>
                      {/* <FormDescription>This is your email.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="engineSpeed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speed </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="tempearture"
                          {...field}
                          className="md:w-[300px] w-[200px]"
                        />
                      </FormControl>
                      {/* <FormDescription>This is your email.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="oilPressure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Oil Pressure </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="tempearture"
                          {...field}
                          className="md:w-[300px] w-[200px]"
                        />
                      </FormControl>
                      {/* <FormDescription>This is your email.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="border-2 p-8 rounded-xl">
              <span className=" text-xl underline decoration-yellow-400">
                Fuel
              </span>
              <div className="flex justify-center">
                <div className="w-[95%] grid md:grid-cols-2 place-items-center gap-4">
                  <FormField
                    control={form.control}
                    name="WaterInFuel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WaterInFuel </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="WaterInFuel"
                            {...field}
                            className="md:w-[300px] w-[200px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fuelLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel Level </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="tempearture"
                            {...field}
                            className="md:w-[300px] w-[200px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fuelPressure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel Pressure </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="tempearture"
                            {...field}
                            className="md:w-[300px] w-[200px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fuelTemperature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel Temperature </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="tempearture"
                            {...field}
                            className="md:w-[300px] w-[200px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="border-2 p-8 rounded-xl">
              <span className="text-xl underline decoration-yellow-400">
                Drive
              </span>
              <div className="flex justify-center">
                <div className="w-[95%] grid md:grid-cols-2 place-items-center gap-4">
                  <FormField
                    control={form.control}
                    name="transmissionPressure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transmission Pressure </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="transmission pressure"
                            {...field}
                            className="md:w-[300px] w-[200px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="brakeControl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brake Control </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="brake control"
                            {...field}
                            className="md:w-[300px] w-[200px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pedalSensor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pedal Sensor </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="pedal sensor"
                            {...field}
                            className="md:w-[300px] w-[200px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="border-2 p-8 rounded-xl">
              <span className="text-xl underline decoration-yellow-400">
                Misc
              </span>
              <div className="flex justify-center">
                <div className="w-[95%] grid md:grid-cols-2 place-items-center gap-4">
                  <FormField
                    control={form.control}
                    name="exhaustGasTemperature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exhaust Gas Temperature </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="exhaust gas temperature"
                            {...field}
                            className="md:w-[300px] w-[200px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="airFilterPressure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Air Filter Pressure </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="air filter pressure"
                            {...field}
                            className="md:w-[300px] w-[200px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="systemVoltage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Systeam Voltage </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="system voltage"
                            {...field}
                            className="md:w-[300px] w-[200px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hydraulicPumpRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hydraulic Pump Rate </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="tempearture"
                            {...field}
                            className="md:w-[300px] w-[200px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="md:w-[300px] w-[200px] bg-yellow-400 text-yellow-600 font-bold hover:bg-yellow-300"
              >
                Add Vehicle
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
