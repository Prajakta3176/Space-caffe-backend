import jwt from "jsonwebtoken";

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Admin token required" });
  }

  jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired admin token" });
    }

    // Check if this is an admin based on your JWT payload
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.adminId = decoded.id; // Attach admin ID to request
    next();
  });
};

export default authenticateAdmin;
