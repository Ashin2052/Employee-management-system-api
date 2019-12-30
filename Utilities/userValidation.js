const Router = require("express").Router;
const router = Router();
const jwt = require("jsonwebtoken");
const sec = require("../config");

function validateUser(req, res, next) {
  const token = req.headers.authorization;
  jwt.verify(token, sec.secrec, function (err, decoded) {
    if (err) return res.status(403).json({ message: "User not authorized" });
    req.email = decoded.email;
    req.UserId = decoded._id;
    req.name = decoded.fullName;
    req.isadmin = decoded.isadmin;
    req.isEmplpoyee = decoded.isEmplpoyee;
    next();
  });
}



module.exports = validateUser;
