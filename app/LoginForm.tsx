"use client";
import axios from "axios";
import { useState } from "react";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Icons } from "../components/icons";
import Image from "next/image";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState({
    field: '',
    message: ''
  });

  const handleGoogleSignIn = () => {
    console.log("google sign in");
    signIn("google", { callbackUrl: `${window.location.origin}/overzicht` });
  };

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement> ) => {
    try {
      e.preventDefault();
      
      const signInResponse = await signIn("credentials", {
        redirect: true,
        username: username,
        password: password,
        callbackUrl: `${window.location.origin}/authenticated/log-sessie`,
      });
    
      console.log('signinresponse', signInResponse);
      if (signInResponse && !signInResponse.ok) {
        const errorMessage = signInResponse.error ? signInResponse.error : "An unknown error occurred.";
        setErrorResponse({
          field: signInResponse.error || 'Lukte niet om in te loggen',
          message: errorMessage
        });
        throw new Error(`error ${errorMessage}`);
      }
    }
    catch (error) {
      console.log('error', error)
    }

  };

  return (
    <div className="flex flex-col gap-4 lg:gap-8">
        <div>
          <h1 className="text-[#3D3D3D] text-2xl md:text-2xl lg:text-4xl mb-6">Login Admin Portaal</h1>
          <Link href="/new-password " className="text-dark">Wachtwoord vergeten? <span className="font-bold  hover:text-dark/70">Maak een nieuwe</span></Link>
        </div>


        <form className="space-y-8 min-w-[300px] lg:min-w-[500px]" onSubmit={handleSubmit}>
                  <div className=" border-b-[1px] border-[#CBCBCB] bg-white">
                    <input
                      id="username"
                      name="username"
                      type="username"
                      autoComplete="username"
                      required
                      className="block w-full py-1.5 text-gray-600 bg-white"
                      placeholder="Gebruikersnaam"
                      autoCapitalize="none"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
    
                  <div className="border-b-[1px] border-[#CBCBCB]">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full py-1.5 text-gray-600 bg-white "
                        placeholder="Wachtwoord"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                    />
                </div>
                
          
                <div className="pt-2">
                  <button
                    type="submit"
                    className={`flex w-full items-center text-lg justify-center rounded-xl bg-primary px-3 text-md font-semibold leading-6  h-[46px] lg:h-[56px] hover:bg-primary/70
                    text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    Login
                  </button>
                </div>
              </form>
    
              <div className="flex flex-row text-[#CBCBCB]">
                <hr className="w-full h-[1px] mt-3 bg-[#CBCBCB]" />

                <p className="mx-4">of</p>
                <hr className="w-full h-[1px] mt-3 bg-[#CBCBCB]" />
              </div>

              <div 
              onClick={handleGoogleSignIn}
              className="border-primary border-2 flex flex-row items-center rounded-xl h-[50px] lg:h-[60px] px-6 hover:cursor-pointer hover:font-bold">
                <Icons.google />
                <p className="text-[#CBCBCB] pl-8">Log in met google</p>
              </div>
               
                {/* Display error message below the form and button */}
                {errorResponse.message !== '' && (
                  <div className="mt-4 text-center ">
                    <p className="text-red-500 text-1xl">Error: {errorResponse.message}</p>
                  </div>
                )}

     
    </div>
  );
};

export default LoginForm;