// enum Environments {
//   dev = 'development',
//   stag = 'staging',
//   prod = 'production',
// }

const environment = {
  BACK_HOST: process.env.FRONT_HOST || "http://localhost",
  BACK_PORT: process.env.FRONT_PORT || "3000"
};

export default environment;
