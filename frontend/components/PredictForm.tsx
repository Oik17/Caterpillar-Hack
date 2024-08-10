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
import { Input } from "@/components/ui/input";
import { DropdownMenuRadioGroupDemo } from "@/components/Dropdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";

type Props = {};

// Define the schema for the form using Zod
const formSchema = z.object({
  components: z.object({
    engine: z.object({
      temperature: z.number(),
      speed: z.number(),
      oilPressure: z.number(),
    }),
    fuel: z.object({
      WaterInFuel: z.number(),
      level: z.number(),
      Pressure: z.number(),
      Temperature: z.number(),
    }),
    drive: z.object({
      transmissionPressure: z.number(),
      brakecontrol: z.number(),
      pedalsensor: z.number(),
    }),
    misc: z.object({
      exhaustGasTemperature: z.number(),
      airFilterPresure: z.number(),
      systemVoltage: z.number(),
      hydraulicPumpRate: z.number(),
    }),
  }),
});

export const PredictForm = ({}: Props) => {
  const [dataFromChild, setDataFromChild] = useState('');
  const handleDataFromChild = async (data: string) => {
    setDataFromChild(data);
    console.log(data);
  };

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      components: {
        engine: {
          temperature: 22,
          speed: 80,
          oilPressure: 20,
        },
        fuel: {
          WaterInFuel: 70,
          level: 2,
          Pressure: 45,
          Temperature: 67,
        },
        drive: {
          transmissionPressure: 90,
          brakecontrol: 1,
          pedalsensor: 5,
        },
        misc: {
          exhaustGasTemperature: 190,
          airFilterPresure: 20,
          systemVoltage: 12.41,
          hydraulicPumpRate: 77.65,
        },
      },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("Predict", values);
      // You can send this data to your backend or use it for prediction
    } catch (error: AxiosError | any) {
      console.log("error");
    }
  }

  return (
    <div className="w-96">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 flex flex-col"
        >
          {/* Engine Fields */}
          <FormField
            control={form.control}
            name="components.engine.temperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Engine Temperature</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="components.engine.speed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Engine Speed</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="components.engine.oilPressure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Oil Pressure</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fuel Fields */}
          <FormField
            control={form.control}
            name="components.fuel.WaterInFuel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Water In Fuel</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="components.fuel.level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Level</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="components.fuel.Pressure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Pressure</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="components.fuel.Temperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Temperature</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Drive Fields */}
          <FormField
            control={form.control}
            name="components.drive.transmissionPressure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transmission Pressure</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="components.drive.brakecontrol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brake Control</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="components.drive.pedalsensor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pedal Sensor</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Misc Fields */}
          <FormField
            control={form.control}
            name="components.misc.exhaustGasTemperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exhaust Gas Temperature</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="components.misc.airFilterPresure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Air Filter Pressure</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="components.misc.systemVoltage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>System Voltage</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="components.misc.hydraulicPumpRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hydraulic Pump Rate</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default PredictForm;
