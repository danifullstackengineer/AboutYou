import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import router from "./router.js";
import dotenv from "dotenv";
import schema from "./schema.js";
import { graphqlHTTP } from "express-graphql";
import { fileURLToPath } from "url";
import expressStaticGzip from "express-static-gzip";
import compression from "compression";
import Coinpayments from "coinpayments";
import helmet from "helmet";
dotenv.config();
import Stripe from "stripe";
import fs from "fs";
import http2 from "http2";
import http2Express from "http2-express-bridge";

const stripe = new Stripe(process.env.STRIPE_SECRET);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = http2Express(express);

const coinpaymentsClient = new Coinpayments({
  key: process.env.COIN_PAYMENTS_PUBLIC,
  secret: process.env.COIN_PAYMENTS_PRIVATE,
});

app.use(compression());
app.use(helmet({ contentSecurityPolicy: false }));
// manually set up csp since helmet's csp doesn't seem to work properly
app.use((req, res, next) => {
  res.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://unpkg.com/react/umd/react.production.min.js https://unpkg.com/react-dom/umd/react-dom.production.min.js https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js https://connect.facebook.net/en_US/sdk.js https://js.stripe.com/v3 www.facebook.com; style-src 'self' https://connect.facebook.net/en_US/sdk.js; frame-src 'self' https://connect.facebook.net/en_US/sdk.js www.facebook.com;"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
if (!(process.env.NODE_ENV === "production")) {
  // Handle app on development
  app.use(cors());
} else {
  // Handle app on production
  app.use(expressStaticGzip(path.join(__dirname, "..", "client", "build")));
  app.get("*", async (_, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}
const PORT = process.env.PORT || 5000;
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV !== "production",
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database...");
    http2.createSecureServer(
      {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        key: fs.readFileSync(path.join(__dirname, "cert", "server.key")),
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        cert: fs.readFileSync(path.join(__dirname, "cert", "server.crt")),
      },
      app
    );
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
  })
  .catch((err) => {
    console.log(`Mongoose responded with error: ${err}`);
  });

export { stripe, coinpaymentsClient };
