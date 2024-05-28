'use server'

import { oauth2Client } from "@/src/util";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { json } from "stream/consumers";


export const getAuthToken = async (authCode:string ) => {
  console.log('"getAuthToken" called');
  try {
    let resultTokens = await oauth2Client.getToken(authCode);
    console.log('resultTokens: ');
    console.log(resultTokens);
    const tokens = resultTokens.tokens 
    // console.log('tokens: ');
    // console.log(tokens);
    if(tokens){
      // oauth2Client.setCredentials(tokens);
      if (tokens.access_token && tokens.refresh_token && tokens.scope && tokens.token_type && tokens.id_token && tokens.expiry_date) { 
      cookies().set('access_token', tokens.access_token, {httpOnly: true, sameSite: 'strict', expires: tokens.expiry_date});
      cookies().set('refresh_token', tokens.refresh_token, {httpOnly: true, sameSite: 'strict', expires: tokens.expiry_date});
      // cookies().set('scope', tokens.scope, {httpOnly: true, sameSite: 'strict'});
      cookies().set('token_type', tokens.token_type, {httpOnly: true, sameSite: 'strict'});
      // cookies().set('id_token', tokens.id_token, {httpOnly: true, sameSite: 'strict'});
      return JSON.stringify(tokens)
      }
    } else {
      throw new Error('Internal Server Error: tokens not found')
    }
  } catch (e:any) {
    console.log(e);
    return JSON.stringify({ error: { message: e?.message } });
  }
  return JSON.stringify({ error: { message: 'Unknown Error' } });
}

export const logout = () => {
  console.log('logging out')
  cookies().delete('access_token')
  cookies().delete('refresh_token')
  cookies().delete('token_type')
  redirect('/auth/login')
}