"use client";
import { logout } from "@/src/actions/Auth";
import { fetchUserDetails, syncDbUser } from "@/src/actions/Users";
import { sendNotifications } from "@/src/actions/slackAnnouncement";
import React, { useEffect, useState } from "react";

const page = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fetchUser = async () => {
    // Using the fetchUserDetails server action to get the user details
    const res: any = await fetchUserDetails();
    // handling errors
    if (res.error) {
      setError(res.error.message);
      return;
    }
    setUserDetails(res);
  };
  // Fetching user details on page load
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      {userDetails?.picture && (
        <img
          src={userDetails?.picture}
          alt="profile picture"
          className="rounded-full w-[50vw] aspect-square max-w-[200px]"
        />
      )}
      <h1>
        <b>Name: </b>
        {userDetails?.name}
      </h1>
      <h2>
        <b>Email: </b>
        {userDetails?.email}
      </h2>
      <div className="flex w-full gap-[5vw] justify-center">
        <button
          className="border-[1px] border-black rounded-[8px] bg-slate-300 px-4 py-2"
          onClick={async () => {
            setError("");
            setSuccess("");
            // using the sendNotifications server action to sync the user details to the database
            let res: any = await sendNotifications(userDetails);
            res = JSON.parse(res);

            // logic to show whether the message send was successful or not
            if (res?.error && !res?.status) {
              setSuccess("");
              setError(res.error);
            } else {
              setError("");
              setSuccess(res.status);
            }
          }}
        >
          Send Message to Slack
        </button>
        <button
          className="border-[1px] border-black rounded-[8px] bg-slate-300 px-4 py-2"
          onClick={() => {
            // a server action that handles deletion of cookies and redirects
            logout();
          }}
        >
          Signout
        </button>
      </div>
      {error && <div className="text-red-700">{error}</div>}
      {success && <div className="text-green-700">{success}</div>}
    </>
  );
};

export default page;
