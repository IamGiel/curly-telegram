const bodyParser = require("body-parser");
const connection = require("../db/mysql/connection");
const createError = require("http-errors");
const { registration_schema } = require("../validation/registration.schema");
const { login_schema } = require("../validation/login.schema");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {signAccessToken, signRefreshToken, verfiyAccessToken, verifyRefreshToken} = require("../jwt/jwt");
const client = require("../redis/redis");

module.exports = {
  register: async (req, res, next) => {
    const { name, email, password, password2, terms, loggedIn } = req.body;
    console.log(req.body)
    try {
      const valid_registration = await registration_schema.validateAsync(req.body);
      let hashedPW;
      bcrypt.genSalt(saltRounds, async (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          // Store hash in your password DB.
          console.log(hash)
          if (valid_registration) {
            let query = `INSERT INTO app_users (user_id,  name, email, password, terms, isLoggedIn) VALUES (NULL, "${name}", "${email}", "${hash}", ${terms}, TRUE)`;
            connection.query(query, async (err, result) => {
              err && next(err);
  
              const accessToken = await signAccessToken(email);
              const refreshToken = await signRefreshToken(email);
              result && res.send({accessToken, refreshToken})
              // result && res.send(`${email} is registered successfully`)
            })
          } else {
            throw createError.BadRequest()
          }
        });
      });
  
  
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error)
    }
  },
  login: async (req, res, next) => {

    const { email, password } = req.body;
    let query = `SELECT * FROM app_users WHERE email="${email}"`;
    try {
  
      const valid_login = await login_schema.validateAsync(req.body);
      if (valid_login) {
        connection.query(query, (err, result) => {
          
          if (result.length === 0) {
            next(err);
          } else {
            const { email, password } = req.body;
            let userInfo = JSON.parse(JSON.stringify(result[0]));
  
            // Load hash from your password DB.
            bcrypt.compare(password, userInfo.password, async function (err, result) {
              // result == true
              err && await res.send(err);
              !result && await res.send(createError.InternalServerError("invalid username/password"));
              const accessToken = await signAccessToken(userInfo.email);
              const refreshToken = await signRefreshToken(userInfo.email);
              result && await res.send({accessToken, refreshToken})
            });
          }
        })
      } else {
        let error = {
          "error": {
            "status": 404,
            "message": "email and password required"
          }
        }
        res.send(error)
      }
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  
  },
  delete: async (req, res, next) => {
    try {
      const {refreshToken} =req.body;
      if(!refreshToken){
        throw createError.BadRequest();
      }
      const userid = await verifyRefreshToken(refreshToken);
      client.DEL(userid, (err,value)=>{
        if(err){
          console.log(err)
          throw createError.InternalServerError();
          return
        }
        console.log("deleted: ", value)
        res.sendStatus(204)
      })
    } catch (error) {
      console.log("catched error")
      createError.InternalServerError();
      next(error)
    }
  },
  refreshToken: async (req, res, next) => {
    console.log("req.body refreshtoken: ", req.body)
    try {
      const { refreshToken } = req.body;
      !refreshToken && res.send(createError.BadRequest());
      const userid = await verifyRefreshToken(refreshToken);
      const accessTok = await signAccessToken(userid);
      const refreshTok = await signRefreshToken(userid);
      res.send({accessTok, refreshTok});
    } catch (error) {
      next(error)
    }
  }

}