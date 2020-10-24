// enum Environments {
//   dev = 'development',
//   stag = 'staging',
//   prod = 'production',
// }

const environment = {
  BACK_URI: process.env.BACK_URI || "http://localhost:3000"
};

export default environment;
