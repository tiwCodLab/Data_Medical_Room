let dbURI =
  "mongodb+srv://admin:admin2567@cluster0.oj2rdfm.mongodb.net/Data_Medical_Room";
if (process.env.NODE_ENV === "production") {
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
