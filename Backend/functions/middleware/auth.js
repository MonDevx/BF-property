const authMiddleware = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(401).send("Authorization header required");
  }
  const parts = bearerHeader.split(" ");
  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
    return res.status(401).send("Invalid authorization format");
  }
  req.token = parts[1];
  return next();
};

module.exports = authMiddleware;
