"use client";
import React from "react";
import { redirectToConsent } from "@/src/actions/redirectToConsent";

const onClickHandler = () => {
  // calling the redirectToConsent server action that will generate and redirect to the consent page
  redirectToConsent();
};

const page = () => {
  return (
    <>
      <h1>Login Page</h1>
      <button
        className="border-[1px] border-black rounded-[8px] bg-slate-300 p-4"
        onClick={onClickHandler}
      >
        Login with Google
      </button>
    </>
  );
};

export default page;
