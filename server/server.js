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
import helmet, { contentSecurityPolicy } from "helmet";
import spdy from "spdy";
dotenv.config();
import Stripe from "stripe";
import fs from "fs";

const stripe = new Stripe(process.env.STRIPE_SECRET);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const coinpaymentsClient = new Coinpayments({
  key: process.env.COIN_PAYMENTS_PUBLIC,
  secret: process.env.COIN_PAYMENTS_PRIVATE,
});

app.use(compression());
// TODO: fix this, it still gives csp errors.
// app.use(
//   helmet(
//     helmet.contentSecurityPolicy({
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: [
//           "'self'",
//           "https://unpkg.com",
//           "https://js.stripe.com",
//           "https://connect.facebook.net",
//         ],
//       },
//     })
//   )
// );
app.use(helmet({ contentSecurityPolicy: false }));
// manually set up csp since helmet's csp doesn't seem to work properly
app.use((req, res, next) => {
  res.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://unpkg.com/react/umd/react.production.min.js https://unpkg.com/react-dom/umd/react-dom.production.min.js https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js https://connect.facebook.net/en_US/sdk.js https://js.stripe.com/v3"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (!(process.env.NODE_ENV === "production")) {
  // Handle app on development
  app.use(cors());
}
app.use("/", router);
if (process.env.NODE_ENV === "production") {
  app.use(expressStaticGzip(path.join(__dirname, "..", "client", "build")));
  app.get("*", async (_, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database...");
    spdy.createServer(
      {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        key: fs.readFileSync(path.join(__dirname, "cert", "server.key")),
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        cert: fs.readFileSync(path.join(__dirname, "cert", "server.crt")),
        spdy: {
          protocols: ["h2"],
        },
      },
      app
    );
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
  })
  .catch((err) => {
    console.log(`Mongoose responded with error: ${err}`);
  });

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV !== "production",
  })
);

export { stripe, coinpaymentsClient };
