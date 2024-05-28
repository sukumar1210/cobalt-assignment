This is a [Next.js](https://nextjs.org/) project made for Cobalt's Backend Intern Role's Assessment.

# Overview

This is a Web-App that utilizes Google's OAuth2 in order to retrieve user's acount details and then broadcast it to a specified Slack Channel.

This App contains the following screens:

`/auth/login` `/auth/callback/google` `/home/`

<video controls src="public/simplescreenrecorder-2024-05-29_01.01.43.mp4" title="Usage Demo Video"></video>

### Purpose:

1. `/auth/login` - A simple screen that shows a Heading of "Login" and a "Login with Google" button. Upon Clicking the "Login with Google" Button the user enters the Google OAuth2 consent flow where he may or may not give us the asked permisions to his account.
2. `/auth/callback/google` - This page is the page where the Google OAuth2 redirects the user after the consent flow completes where we are returned with an `authorization code` which is then exchanged with the `auth_token` and a `refresh_token`. These tokens are then used to send requests to various Google API's. For better Demonstration of how the Consent flow works we have not automated the Token Exchange process and left 2 Buttons to be pressed by the user in order to demonstrate what the Current State is. **(We can simply make this automated using a `useEffect` React Hook)**.
3. `/home/` - This screen shows the "Send Message to Slack Channel" and "Logout" buttons.

##### Google's OAuth2 Flow

<p align="center">
  <img  src="./public//authorization-code.png" alt="OAUTH2 Flow">
<p>

## Robust Features

- All the Backend Operations are handled in `NextJS Server Actions` which are the latest feature additions in Next 14. All the required code runs on the Shared Next Server without explicitely making API hits.
- All the **Error States** encountered on the **Server Action** are systematically communicated to the client.
- All the Authentications cases handled in middleware.
  e.g A user that is not logged in may be `redirected` to the `login page` even when they attempt to access the `home` page and vice-versa.
- Cookies are set to **httponly** and **samesite** paramter set to _string_.

## Getting Started

To Setup the Project Locally:

1. Clone the Project to your device using:

```bash
git clone https://github.com/sukumar1210/cobalt-assignment.git
```

2. Obtain your Tokens for the Google OAuth2 and Slack and MongoDB Connection String via respective consoles following their respective Documentation:
   - Google - [Follow this Documentation's Prerequisite Section](https://developers.google.com/identity/protocols/oauth2/web-server#prerequisites)
   - MongoDB - [Follow this Doc to obtain your MongoDB Connection String](https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/)
   - Slack - [Slack Documentation for sending Messages via Webhooks](https://api.slack.com/messaging/webhooks)
3. Add your respective Tokens and Secrets to a `.env` file. You may follow the `sample.env` file for reference.
4. Start the Development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
