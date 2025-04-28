import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, `${process.env.JWT_PASSWORD}`, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token expired. Please signin again" });
    }
    // console.log("Decoded User: ", user);
    req.user = user;
    next();
  });
};


export default authenticateToken;
