"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
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
import { Toaster, toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must contain minimum 8 characters"),
});

export default function ProfileForm() {
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
      const response = await axios.post("http://localhost:8080/login", {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem('Auth',response.data.data);
      console.log("Signup successful:", response.data);
      toast.success(response.data.message);
      router.push("/dashboard");
    } catch (error: AxiosError | any) {
      console.error("Signup failed:", error);
      toast.error(error.message);
    }
  }

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <span className="text-2xl font-semibold un">Log in</span>
      <section className="md:w-96 w-[300px] border-2 px-8 py-6 bg-[#e9e8e8]">
        <Toaster position="top-center" richColors />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="md:w-[300px] w-[200px]" placeholder="email" {...field} />
                  </FormControl>
                  <FormDescription>This is your email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input className="md:w-[300px] w-[200px]" type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormDescription>This is your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <section className="text-center">
              <Link href={"/signup"} className="text-xs underline">
                Dont have an account? Sign Up
              </Link>
            </section>
            <Button type="submit" className="bg-yellow-400 text-yellow-600 font-bold hover:bg-yellow-300">Submit</Button>
          </form>
        </Form>
      </section>
    </main>
  );
}
