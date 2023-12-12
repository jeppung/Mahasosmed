"use client";

import { Button } from "@mantine/core";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteCookie, getCookie } from "cookies-next";
import { updateUser } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "@/network";

export default function Home() {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await axios.post(
        `${BASE_URL}/logout`,
        {
          accessToken: getCookie("accessToken"),
          refreshToken: getCookie("refreshToken"),
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        }
      );

      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      dispatch(updateUser(undefined));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return toast.error(e.response?.data.message ?? "An error occured");
      }
      return toast.error("An error occured");
    }
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <Toaster />
      <h1 className="text-3xl">{user.data && `Hi, ${user.data.username}`}</h1>
      <h1 className="text-3xl font-bold">Test Mantine</h1>
      <div className="mt-5">
        <Button
          onClick={() =>
            user.data ? logoutHandler() : router.push("/auth/login")
          }
          className="bg-red-500"
        >
          {user.data ? "Logout" : "Login"}
        </Button>
      </div>
    </main>
  );
}
