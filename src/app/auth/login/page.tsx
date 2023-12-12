"use client";

import {
  IAPILoginResponse,
  IAPIResponse,
  IAPIUserDetailResponse,
} from "@/interfaces/api_interface";
import { BASE_URL } from "@/network";
import { updateUser } from "@/store/slices/userSlice";
import { Button, Loader, TextInput } from "@mantine/core";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

interface ILoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ILoginForm>();

  const getUserDetail = async (token: string) => {
    try {
      const res = await axios.get(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = res.data as IAPIResponse<IAPIUserDetailResponse>;
      console.log(resData.data!);
      dispatch(updateUser(resData.data!));
    } catch (e) {
      throw new Error();
    }
  };

  const loginHandler: SubmitHandler<ILoginForm> = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        username: data.username,
        password: data.password,
      });

      const resData = res.data as IAPIResponse<IAPILoginResponse>;
      setCookie("accessToken", resData.data?.accessToken);
      setCookie("refreshToken", resData.data?.refreshToken);

      await getUserDetail(resData.data!.accessToken);

      setLoading(false);
      toast.success("Login success");
      router.push("/");
    } catch (e) {
      setLoading(false);
      if (axios.isAxiosError(e)) {
        return toast.error(e.response?.data.message ?? "An error occured");
      }
      return toast.error("An error occured");
    }
  };

  const userValidationHandler = async (token: string) => {
    try {
      const res = await axios.post(`${BASE_URL}/validation`, {
        token: token,
      });

      toast.success(res.data.message, {
        id: "validation_success",
      });
      router.replace("/auth/login");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message, {
          id: "validation_error",
        });
        return router.replace("/auth/login");
      }
      toast.error("An error occured", {
        id: "validation_error",
      });
      return router.replace("/auth/login");
    }
  };

  useEffect(() => {
    if (params !== null) {
      if (params.get("redirectFromRegister") !== null) {
        toast.success("Please check your email for validation", {
          id: "register_success",
        });
        router.replace("/auth/login");
      }

      if (
        params.get("redirectFromEmail") !== null &&
        params.get("token") !== null
      ) {
        userValidationHandler(params.get("token") as string);
      }
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
          <Button
            type="submit"
            className="bg-black w-full"
            disabled={loading ? true : false}
          >
            {loading ? <Loader color="white" size="sm" /> : "Submit"}
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
