import * as dotenv from "dotenv";
dotenv.config();

let dbURI = process.env.MONGO_URL;
if (process.env.NODE_ENV === "product") {
  dbURI = process.env.MONGO_URI ? process.env.MONGO_URI : dbURI; // production DB server
}

export const config = {
  database: dbURI,
  userMongoClient: true,
  connectOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  mongoDebug: true,
};
