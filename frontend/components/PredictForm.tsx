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
    <div className="w-[800px] min-w-[200px]">
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
          <div className="flex flex-col gap-4">
            <span className="text-xl underline decoration-yellow-400">
              Engine
            </span>
            <div className="grid grid-cols-2">
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
                        className="w-[200px]"
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
                        className="w-[200px]"
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
                        className="w-[200px]"
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
                        className="w-[200px]"
                      />
                    </FormControl>
                    {/* <FormDescription>This is your email.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-xl underline decoration-yellow-400">
              Fuel
            </span>
            <div className="grid grid-cols-2">
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
                        className="w-[200px]"
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
                        className="w-[200px]"
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
                        className="w-[200px]"
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
                        className="w-[200px]"
                      />
                    </FormControl>
                    {/* <FormDescription>This is your email.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Generate Prediction
          </Button>
        </form>
      </Form>
    </div>
  );
};
