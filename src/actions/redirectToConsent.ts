'use server'

import { OAUTH2_CLIENT_ID, OAUTH2_CLIENT_SECRET, OAUTH2_REDIRECT_URL, oauth2Client } from "@/src/util";
import { redirect } from "next/navigation";


export const redirectToConsent = () => {
  console.log('OAUTH2_CLIENT_ID: ', OAUTH2_CLIENT_ID)
  console.log('OAUTH2_CLIENT_SECRET: ', OAUTH2_CLIENT_SECRET)
  console.log('OAUTH2_REDIRECT_URL: ', OAUTH2_REDIRECT_URL)
  

  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    // 'https://www.googleapis.com/openid',
  ];

  // scopes
  // ./auth/userinfo.email
  // ./auth/userinfo.profile
  // openid  console.log('"redirecting to consent" called');
  
  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
  
    // If you only need one scope you can pass it as a string
    scope: scopes
  });

  redirect(url)
  
}

