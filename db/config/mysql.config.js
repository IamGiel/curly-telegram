// module.exports = { 
//   HOST: "us-cdbr-east-05.cleardb.net",
//   USER: "b24ded93e7567d",
//   PASSWORD: "76b468d4",
//   DB: "heroku_e3820264fa0117d"
// }

module.exports = { 
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB:process.env.DB
}

// CLEARDB_DATABASE_URL => mysql://b24ded93e7567d:76b468d4@us-cdbr-east-05.cleardb.net/heroku_e3820264fa0117d?reconnect=true

// mysql -ub24ded93e7567d -p76b468d4 -h us-cdbr-east-05.cleardb.net