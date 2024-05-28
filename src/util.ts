import { google } from "googleapis"

export const OAUTH2_CLIENT_ID = process.env.OAUTH2_CLIENT_ID
export const OAUTH2_CLIENT_SECRET = process.env.OAUTH2_CLIENT_SECRET
export const OAUTH2_REDIRECT_URL = process.env.OAUTH2_REDIRECT_URL

export const oauth2Client = new google.auth.OAuth2(
  process.env.OAUTH2_CLIENT_ID,
  process.env.OAUTH2_CLIENT_SECRET,
  process.env.OAUTH2_REDIRECT_URL?.split(' '),
);