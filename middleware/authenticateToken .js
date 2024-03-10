import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt; // แก้จาก req.cookie.jwt เป็น req.cookies.jwt

  if (token == null)
    return res
      .status(401)
      .json({ message: "A token required for authentication" }); // if there isn't any token

  try {
    const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    req.user = user;
    console.log("user", user);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};
export default authenticateToken;
