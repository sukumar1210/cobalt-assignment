'use server'

import { cookies } from "next/headers";
import clientPromise from "../mongodb";

export const fetchUserDetails = async ():Promise<string> => {
  console.log('"fetchUserDetails" called');
  const accessToken = cookies().get('access_token')
  console.log('accessToken: ', accessToken);
  try {
    const res = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken?.value}&alt=json`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const json = await res.json();
    syncDbUser(json)
    return json
  } catch (e:any) {
    console.log(e);
    return JSON.stringify({ error: { message: e.message } });
  }
}

export const syncDbUser = async ({name, email, picture}: {name:string, email:string, picture: string}) => {
  const database = (await clientPromise).db('users')
  console.log("name: ", name);
  console.log("email: ", email);
  console.log("picture: ", picture);

    
  const Users = database.collection('users')
  const dbUser = await Users.findOne({email: email})
  if (!dbUser) {
    await Users.insertOne({name, email, picture});
  } else {
    console.log("update User");
    await Users.updateOne({_id: dbUser._id}, { $set: {name, email, picture}})
  }
}