import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("A token required for authentication"); //invalid token
    req.username = decoded.UserInfo.username;
    req.firstname = decoded.UserInfo.firstname;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

export default verifyJWT;
