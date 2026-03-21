const authMiddleware = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(401).send("Unauthorized");
  }
  const bearer = bearerHeader.split(" ");
  req.token = bearer[1];
  return next();
};

module.exports = authMiddleware;
