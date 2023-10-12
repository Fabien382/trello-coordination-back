// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ error: "Accès non autorisé" });
  }

  jwt.verify(token, "JESUISUNECLEFSECRETE", (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Accès non autorisé" });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;
