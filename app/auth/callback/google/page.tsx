"use client";
import { getAuthToken } from "@/src/actions/Auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// interface for the tokens that the Google OAuth2 API returns
interface Tokens {
  access_token?: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  id_token?: string;
  expiry_date?: number;
  error?: any;
}

const page = () => {
  // The Consent Flow returns to the redirect URL with a Authentication code query parameter that will be used to obtain the tokens
  const query = useSearchParams();
  const router = useRouter();
  const keys = query.keys();

  // creating an object from the query parameters for ease of use
  const queryObj = Object.create({});
  for (const [key, value] of query.entries()) {
    queryObj[key] = value;
  }
  // state to store the tokens
  const [tokens, setTokens] = useState<Tokens | null>(null);

  // function to get the tokens from the Google OAuth2 API
  const onClickHandler = async () => {
    try {
      // calling the getAuthToken server action with the code query parameter
      let res: string = await getAuthToken(queryObj.code);
      const resobj = JSON.parse(res);
      // setting the returned tokens in the state
      if (tokens?.error) {
        throw new Error(resobj.error.message);
      }
      setTokens(resobj);
    } catch (error) {
      console.log(error);
      router.push("/auth/login");
    }
  };

  //Uncomment if you wish to skip the button click and get the token on page load
  // useEffect(() => {
  //   onClickHandler()
  // }, [])

  return (
    <>
      <h1 className="text-[24px] font-semibold">Login Page</h1>
      {/* Button to exchange the Authentication code for the auth_tokens and refresh_tokens */}
      {!tokens && (
        <button
          onClick={onClickHandler}
          className="border-[1px] border-black rounded-[8px] bg-slate-300 px-4 py-2"
        >
          Get Token
        </button>
      )}
      {/* auth Token from Search Params */}
      <div className="w-screen px-4 py-2 text-wrap break-words">
        <b>returned Auth Code:</b>
        <p className="text-[11px]">{`${queryObj.code}`}</p>
      </div>
      {/* rendered after the tokens are obtained */}
      {tokens && !tokens.error && (
        <>
          <div>The tokens have been recieved you may proceed to Home</div>
          <button
            className="border-[1px] border-black rounded-[8px] bg-slate-300 px-4 py-2"
            onClick={() => {
              router.push("/home");
            }}
          >
            Home
          </button>
        </>
      )}
      {tokens && tokens.error && (
        <>
          <div className="w-screen px-4 py-2 text-wrap break-words">{`Error: ${tokens.error?.message}`}</div>
          <button
            className="border-[1px] border-black rounded-[8px] bg-slate-300 px-4 py-2"
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            Go back to Login
          </button>
        </>
      )}
      {tokens?.access_token && (
        <div className="w-screen px-4 py-2 text-wrap break-words">
          <b>access_token:</b>
          <p className="text-[11px]">{`${tokens.access_token}`}</p>
        </div>
      )}
      {tokens?.refresh_token && (
        <div className="w-screen px-4 py-2 text-wrap break-words">
          <b>refresh_token:</b>
          <p className="text-[11px]">{`${tokens.refresh_token}`}</p>
        </div>
      )}
      {tokens?.scope && (
        <div className="w-screen px-4 py-2 text-wrap break-words">
          <b>scope:</b>
          <p className="text-[11px]">{`${tokens.scope}`}</p>
        </div>
      )}
      {tokens?.token_type && (
        <div className="w-screen px-4 py-2 text-wrap break-words">
          <b>token_type:</b>
          <p className="text-[11px]">{`${tokens.token_type}`}</p>
        </div>
      )}
      {tokens?.id_token && (
        <div className="w-screen px-4 py-2 text-wrap break-words">
          <b>id_token:</b>
          <p className="text-[11px]">{`${tokens.id_token}`}</p>
        </div>
      )}
      {tokens?.expiry_date && (
        <div className="w-screen px-4 py-2 text-wrap break-words">
          <b>expiry_date:</b>
          <p className="text-[11px]">{`${tokens.expiry_date}`}</p>
        </div>
      )}
    </>
  );
};

export default page;
