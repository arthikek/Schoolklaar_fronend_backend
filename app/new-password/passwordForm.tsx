"use client";
import axios from "axios";
import { useState } from "react";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "../../components/icons";


const PasswordForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState({
    field: '',
    message: ''
  });

  const handleGoogleSignIn = () => {

    signIn("google", { callbackUrl: `${window.location.origin}/overzicht` });
  };

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement> ) => {
    try {
      e.preventDefault();
      
      const signInResponse = await signIn("credentials", {
        redirect: true,
        username: username,
        password: password,
        callbackUrl: `${window.location.origin}/authenticated/overzicht`,
      });
    

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

    }

  };

  return (
    <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-[#3D3D3D] text-xl md:text-2xl lg:text-4xl">Wachtwoord Vergeten</h1>
        </div>


        <form className="space-y-8 min-w-[350px] lg:min-w-[500px]" onSubmit={handleSubmit}>
                  <div className=" border-b-[1px] border-[#CBCBCB] bg-white">
                    <input
                      id="old-password"
                      name="old-password"
                      type="old-password"
                      autoComplete="old-password"
                      required
                      className="block w-full py-1.5 text-gray-600 bg-white"
                      placeholder="Oude Wachtwoord"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
    
                  <div className="border-b-[1px] border-[#CBCBCB]">
                    <input
                        id="new-password"
                        name="new-password"
                        type="new-password"
                        autoComplete="new-password"
                        required
                        className="block w-full py-1.5 text-gray-600 bg-white "
                        placeholder="Nieuw Wachtwoord"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                    />
                </div>

                <div className="border-b-[1px] border-[#CBCBCB]">
                    <input
                        id="repeat-new-password"
                        name="repeat-new-password"
                        type="repeat-new-password"
                        autoComplete="repeat-new-password"
                        required
                        className="block w-full py-1.5 text-gray-600 bg-white "
                        placeholder="Herhaal Nieuw Wachtwoord"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                    />
                </div>
                
          
                <div className="pt-2">
                  <button
                    type="submit"
                    className={`flex w-full items-center text-lg justify-center rounded-xl bg-primary px-3 text-md font-semibold leading-6 h-[56px] hover:bg-primary/70
                    text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    Verander Wachtwoord
                  </button>
                </div>
              </form>
    
              <div className="flex flex-row text-[#CBCBCB] ">
                <hr className="w-full h-[1px] mt-3 bg-[#CBCBCB]" />

                <Link href= {'/'} className="mx-4 min-w-[130px] hover:font-bold text-center">terug naar login</Link>
                <hr className="w-full h-[1px] mt-3 bg-[#CBCBCB]" />
              </div>


     
    </div>
  );
};

export default PasswordForm;