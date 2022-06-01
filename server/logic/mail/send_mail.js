/* eslint-disable @typescript-eslint/no-var-requires */
import nodemailer from "nodemailer";
import { google } from "googleapis";

const send_mail = async (receiver_email, subject, text, html) => {
  try {
    const redirect_uri = "https://developers.google.com/oauthplayground";
    if (
      !process.env.GMAIL_API_ID ||
      !process.env.GMAIL_API_SECRET ||
      !process.env.GMAIL_REFRESH_TOKEN ||
      !process.env.GMAIL_API_SENDER_ACCOUNT
    ) {
      throw new Error(
        "Please ensure you have proper key/value pairs in your .env file."
      );
    }

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GMAIL_API_ID,
      process.env.GMAIL_API_SECRET,
      redirect_uri
    );
    oAuth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const access_token = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_API_SENDER_ACCOUNT,
        clientId: process.env.GMAIL_API_ID,
        clientSecret: process.env.GMAIL_API_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: access_token,
      },
      secure: true,
      logger: process.env.NODE_ENV !== "production",
      debug: process.env.NODE_ENV !== "production",
      tls: {
        rejectUnauthorized: true,
      },
    });

    const mail_options = {
      from: "NB 💌 <" + process.env.GMAIL_API_SENDER_ACCOUNT + ">",
      to: receiver_email,
      subject,
      text: text,
      html: html,
    };
    const result = await transport.sendMail(mail_options);
    return result;
  } catch (err) {
    return err;
  }
};

export { send_mail };
