"use client";

import { Button, TextInput } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

interface ILoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const params = useSearchParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ILoginForm>();

  const loginHandler: SubmitHandler<ILoginForm> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (params.get("redirectFromRegister")) {
      toast.success("Please check your email for validation", {
        id: "register_success",
      });
      router.replace("/auth/login");
    }
  }, [params]);

  return (
    <>
      <Toaster />
      <h1 className="text-3xl">Login</h1>
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="mt-5 flex flex-col gap-y-2"
      >
        <TextInput
          {...register("username", {
            required: "Username is required",
            onChange: (e) => {
              setValue("username", e.target.value.trim());
            },
          })}
          label="Username"
          error={errors.username?.message}
        />
        <TextInput
          {...register("password", {
            required: "Password is required",
            onChange: (e) => {
              setValue("password", e.target.value.trim());
            },
          })}
          label="Password"
          type="password"
          error={errors.password?.message}
        />
        <div className="mt-5 w-full">
          <Button type="submit" className="bg-black w-full">
            Submit
          </Button>
        </div>
      </form>
      <div className="text-center mt-10">
        <p className="text-sm">
          Dont have an account?{" "}
          <span
            className="text-blue-500 font-bold hover:cursor-pointer"
            onClick={() => router.push("/auth/register")}
          >
            Register Here
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
