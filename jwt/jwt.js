const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const client = require("../redis/redis");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN;
      const options = {
        expiresIn: "1y",
        issuer: "mylocalhost.com",
        audience: userId,
      };
      jwt.sign(payload, secret, options, async (err, token) => {
        if (err) {
          console.log(err);
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verfiyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) {
      res.send("access token not correct");
      return next(createError.Unauthorized());
    }

    const authHeaders = req.headers["authorization"];
    const bearerToken = authHeaders.split(" ");
    const token = bearerToken[1];

    // console.info(token)

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, payload) => {
      // console.log(payload)
      if (err) {
        console.log(err.name);
        // res.send(createError.Unauthorized())

        const message =
          err.name === "JsonWebTokenError"
            ? res.send(createError.Unauthorized())
            : res.send(createError.Unauthorized(err.message));
        next(message);
      }
      req.payload = payload;
      next();
    });
  },
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN;
      const options = {
        expiresIn: "1y",
        issuer: "mylocalhost.com",
        audience: userId,
      };
      jwt.sign(payload, secret, options, async (err, token) => {
        if (err) {
          console.log(err);
          return await reject(createError.InternalServerError());
        }
        const oneyear = 365*24*60*60;
        const EXPIRE = {
          EX: oneyear,
        };
        client.SET(userId, token, EXPIRE, (err, reply) => {
          if (err) {
            console.log(err.message);
            reject(createError.InternalServerError());
            return;
          }
        });
        resolve(token);
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        async (err, payload) => {
          if (err) return reject(createError.Unauthorized());
          const userid_ = payload.aud;
          console.log("this user id ", userid_);
          const value = await client.get(userid_);
          console.log("this value ", value);
          if (!value) {
            console.log("no value");
            await reject(createError.InternalServerError());
            return;
          }
          console.log(userid_);

          if (refreshToken === value) {
            console.log("everything ok ");
            return await resolve(userid_);
          }

          await reject(createError.Unauthorized());
         
          // resolve(userid_)
        }
      );
    });
  },
};
