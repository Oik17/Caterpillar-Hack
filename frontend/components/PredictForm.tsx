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

const formSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must contain minimum 8 characters"),
});

export const PredictForm = ({}: Props) => {
  const [dataFromChild, setDataFromChild] = useState("");
  const handleDataFromChild = async (data: string) => {
    setDataFromChild(data);
    console.log(data);
    // console.log(dataFromChild)
  };

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("Predict");
    } catch (error: AxiosError | any) {
      console.log("erroor");
    }
  }
  return (
    <div className="w-full min-w-[300px] flex justify-center">
      {/* <span className="text-2xl bg-yellow-300 p-2 rounded-md w-full">
        Machine
      </span> */}
      <div className="w-[80%]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 flex flex-col"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Machine: </FormLabel>
                  <FormControl>
                    <DropdownMenuRadioGroupDemo
                      onDataReceive={handleDataFromChild}
                    />
                  </FormControl>
                  {/* <FormDescription>This is your email.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="text-2xl bg-yellow-300 p-2 rounded-md">
              Components
            </span>
            <div className="border-2 p-8 rounded-xl">
              <span className="text-xl underline decoration-yellow-400 ml-10">
                Engine
              </span>
              <div className="grid md:grid-cols-2  place-items-center ">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperature </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="tempearture"
                          {...field}
                          className="w-[300px]"
                        />
                      </FormControl>
                      {/* <FormDescription>This is your email.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperature </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="tempearture"
                          {...field}
                          className="w-[300px]"
                        />
                      </FormControl>
                      {/* <FormDescription>This is your email.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperature </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="tempearture"
                          {...field}
                          className="w-[300px]"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Temperature </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="tempearture"
                            {...field}
                            className="w-[300px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Temperature </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="tempearture"
                            {...field}
                            className="w-[300px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Temperature </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="tempearture"
                            {...field}
                            className="w-[300px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Temperature </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="tempearture"
                            {...field}
                            className="w-[300px]"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transmission Pressure </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="transmission pressure"
                            {...field}
                            className="w-[300px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brake Control </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="brake control"
                            {...field}
                            className="w-[300px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pedal Sensor </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="pedal sensor"
                            {...field}
                            className="w-[300px]"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exhaust Gas Temperature </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="exhaust gas temperature"
                            {...field}
                            className="w-[300px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Air Filter Pressure </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="air filter pressure"
                            {...field}
                            className="w-[300px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Systeam Voltage </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="system voltage"
                            {...field}
                            className="w-[300px]"
                          />
                        </FormControl>
                        {/* <FormDescription>This is your email.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hydraulic Pump Rate </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="tempearture"
                            {...field}
                            className="w-[300px]"
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
              <Button type="submit" className="w-[300px]">
                Generate Prediction
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
