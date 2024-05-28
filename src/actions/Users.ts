"use server";

import { cookies } from "next/headers";
import clientPromise from "../mongodb";

export const fetchUserDetails = async (): Promise<string> => {
  // obtaining auth_token from the cookies
  const accessToken = cookies().get("access_token");
  try {
    // fetching user details from the Google OAuth2 API
    const res = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken?.value}&alt=json`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const json = await res.json();

    // syncing the user details in the database and adding if not present
    syncDbUser(json);

    return json;
  } catch (e: any) {
    console.log(e);
    return JSON.stringify({ error: { message: e.message } });
  }
};

export const syncDbUser = async ({
  name,
  email,
  picture,
}: {
  name: string;
  email: string;
  picture: string;
}) => {
  try {
    const database = (await clientPromise).db("users");
    const Users = database.collection("users");

    // look for the user in the database
    const dbUser = await Users.findOne({ email: email });
    if (!dbUser) {
      // if not found add the user to the database
      await Users.insertOne({ name, email, picture });
    } else {
      // if found update the user details in the database
      await Users.updateOne(
        { _id: dbUser._id },
        { $set: { name, email, picture } },
      );
    }
  } catch (e: any) {
    console.log(e);
  }
};
