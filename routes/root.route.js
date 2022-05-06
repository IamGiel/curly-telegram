const express = require("express");
const { verfiyAccessToken } = require("../jwt/jwt");
const rootRoute = express.Router();

rootRoute.get("/", verfiyAccessToken,  async(req,res,next)=>{
  console.log(req.headers)
  res.send("hello root '/' route")
})

module.exports = rootRoute;