/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { MainContainer } from "../components/MainContainer";
import { trpc } from "../utils/trpc";

import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { SignInButton } from "../components/SignIn/SignInButton";
import { SignInInput } from "../components/SignIn/SignInInput";

const SignInPage: NextPage = () => {
  const authMethods = trpc.useQuery(["user.getAuthMethods"]);
  const [cookies, setCookie, removeCookie] = useCookies([
    "provider",
    "pb_auth",
  ]);
  const router = useRouter();

  const createUserMutation = trpc.useMutation(["user.create"], {
    onSuccess: () => {
      router.push("/");
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <MainContainer>
      <div className="w-full h-full px-5 flex bg-zinc-50 flex-col lg:flex-row">
        <div className="w-full h-full flex  justify-center items-center">
          <div className="max-w-xl w-full flex flex-col justify-center gap-3">
            <h1 className="font-bold text-4xl mb-5">Sign In with email</h1>
            <SignInInput
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <SignInInput
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              onClick={async () => {
                const token = await createUserMutation.mutateAsync({
                  email,
                  password,
                  passwordConfirm: password,
                });

                console.log(token);
              }}
              className="w-full h-12 bg-zinc-100 rounded-lg hover:bg-zinc-200 font-semibold transition-all"
            >
              Submit
            </button>
            <h2 className="font-bold text-2xl text-zinc-600 my-5">
              or with another service
            </h2>
            <div className="w-full flex gap-3">
              <SignInButton
                onClick={() => {
                  authMethods.data?.authProviders.forEach((method, index) => {
                    if (method.name === "google") {
                      setCookie(
                        "provider",
                        authMethods.data.authProviders[index],
                        {
                          domain: "localhost",
                        }
                      );

                      router.push(
                        method.authUrl +
                          "http://localhost:3000/api/auth/redirect"
                      );
                    }
                  });
                }}
              >
                <FcGoogle size={25} />
                Google
              </SignInButton>
              <SignInButton
                onClick={() => {
                  authMethods.data?.authProviders.forEach((method, index) => {
                    if (method.name === "facebook") {
                      setCookie(
                        "provider",
                        authMethods.data.authProviders[index],
                        {
                          domain: "localhost",
                        }
                      );

                      router.push(
                        method.authUrl +
                          "http://localhost:3000/api/auth/redirect"
                      );
                    }
                  });
                }}
              >
                <BsFacebook size={25} />
                Facebook
              </SignInButton>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full p-10">
          <img
            src="/images/undraw-map.svg"
            alt="map image"
            className="w-96"
            draggable={false}
          />
        </div>
      </div>
    </MainContainer>
  );
};

export default SignInPage;
