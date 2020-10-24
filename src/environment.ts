// enum Environments {
//   dev = 'development',
//   stag = 'staging',
//   prod = 'production',
// }

const environment = {
  BACK_HOST: process.env.BACK_HOST || "http://localhost",
  BACK_PORT: process.env.BACK_PORT || "3000"
};

export default environment;
