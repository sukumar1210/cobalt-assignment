"use server";

import { SLACK_WEBHOOK_URL } from "../util";

export const sendNotifications = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  try {
    let res;
    // Sending Notification to Slack Channel using Webhook
    if (SLACK_WEBHOOK_URL) {
      res = await fetch(SLACK_WEBHOOK_URL, {
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify({
          text: `Name: ${name}\nContact: ${email}`,
        }),
      });
    } else {
      throw new Error(
        "Environment Variable SLACK_WEBHOOK_URL not set. Please set it in .env file.",
      );
    }

    // checking the status of the response and thus interpreting whether the Message was sent or not
    if (res?.statusText != "OK") throw new Error("Couldn't Send Notification");
    return JSON.stringify({ status: "Message Sent to Slack Channel" });
  } catch (e: any) {
    console.log("error hit");
    return JSON.stringify({ error: e.message });
  }
};
