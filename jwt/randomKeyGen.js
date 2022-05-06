const crypto = require("crypto");

const key1 = crypto.randomBytes(32).toString("hex");
const key2 = crypto.randomBytes(32).toString("hex");
console.table({key1,key2})
result:
┌─────────┬────────────────────────────────────────────────────────────────────┐
│ (index) │                               Values                               │
├─────────┼────────────────────────────────────────────────────────────────────┤
│  key1   │ '528a2c07d3bc7b5cb96e4536a45662fe76d2c82ddd4582255a4533051da91724' │
│  key2   │ 'a048d77d5fb737d191e4bb0b623c6504e677cb664e2d83b130bae62e88ebaa4a' │
└─────────┴────────────────────────────────────────────────────────────────────┘