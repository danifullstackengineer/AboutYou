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
import https from "https";
import spdy from "spdy";
dotenv.config();
import Stripe from "stripe";
import fs from "fs";
import { promisify } from "util";
const stripe = new Stripe(process.env.STRIPE_SECRET);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const readFile = promisify(fs.readFile);
const app = express();

const coinpaymentsClient = new Coinpayments({
  key: process.env.COIN_PAYMENTS_PUBLIC,
  secret: process.env.COIN_PAYMENTS_PRIVATE,
});

app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next)=> {
  res.setHeader('Cache-Control', 'must-revalidate, max-age: 86400')
})
if (!(process.env.NODE_ENV === "production")) {
  app.use(cors());
}
app.use("/", router);
if (process.env.NODE_ENV === "production") {
  app.use(expressStaticGzip(path.join(__dirname, "..", "client", "build")));
  app.get("*", async (_, res) => {
    if (res.push) {
      res.sendFile(
        path.resolve(__dirname, "..", "client", "build", "index.html")
      );
    }
  });
}
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database...");
    spdy.createServer(
      {
        key: fs.readFileSync("./cert/server.key"),
        cert: fs.readFileSync("./cert/server.crt"),
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
