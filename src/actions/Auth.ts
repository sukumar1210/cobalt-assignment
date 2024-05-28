"use server";

import { oauth2Client } from "@/src/util";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const redirectToConsent = () => {
  // Defining scopes for the consent page
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    // 'https://www.googleapis.com/openid',
  ];

  // Generating the consent page URL
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  // Redirecting to the consent page
  redirect(url);
};

export const getAuthToken = async (authCode: string) => {
  try {
    // Exchanging Auth Code for Tokens
    let resultTokens = await oauth2Client.getToken(authCode);
    const tokens = resultTokens.tokens;
    if (tokens) {
      // Setting the tokens in the cookies
      if (
        tokens.access_token &&
        tokens.refresh_token &&
        tokens.token_type &&
        tokens.expiry_date
      ) {
        cookies().set("access_token", tokens.access_token, {
          httpOnly: true,
          sameSite: "strict",
          expires: tokens.expiry_date,
        });
        cookies().set("refresh_token", tokens.refresh_token, {
          httpOnly: true,
          sameSite: "strict",
          expires: tokens.expiry_date,
        });
        cookies().set("token_type", tokens.token_type, {
          httpOnly: true,
          sameSite: "strict",
        });
        return JSON.stringify(tokens);
      }
    } else {
      throw new Error("Internal Server Error: tokens not found");
    }
  } catch (e: any) {
    console.log(e);
    return JSON.stringify({ error: { message: e?.message } });
  }
  return JSON.stringify({ error: { message: "Unknown Error" } });
};

export const logout = () => {
  // clearing the cookies on logout
  cookies().delete("access_token");
  cookies().delete("refresh_token");
  cookies().delete("token_type");
  // redirecting to the login page
  redirect("/auth/login");
};
