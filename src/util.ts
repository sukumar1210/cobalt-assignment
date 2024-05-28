import { google } from "googleapis";

// this file is used to supply with a common export for all the environment variables and the OAuth2 client

export const OAUTH2_CLIENT_ID = process.env.OAUTH2_CLIENT_ID;
export const OAUTH2_CLIENT_SECRET = process.env.OAUTH2_CLIENT_SECRET;
export const OAUTH2_REDIRECT_URL = process.env.OAUTH2_REDIRECT_URL;

export const oauth2Client = new google.auth.OAuth2(
  process.env.OAUTH2_CLIENT_ID,
  process.env.OAUTH2_CLIENT_SECRET,
  process.env.OAUTH2_REDIRECT_URL?.split(" "),
);

export const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
