const dotenv = require('dotenv');

const getVariables = ()=> {
  //  Select the environment variables file to use
  const envPath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env.production" // use production environment variables if NODE_ENV is not defined
  const result = dotenv.config({ path: envPath });

  if (result.error) {
    throw result.error;
  }

  const { parsed: envs } = result;
  //  Additional non-environment variables
  const noneEnvVaribkles = {
    // EXAMPLE: "additional content from NON-ENVIRONMENT VARIABLES"
  }
  //  Append non-environment variables
  Object.assign(envs, noneEnvVaribkles);

  if(process.env.NODE_ENV  && process.env.NODE_ENV  === "development") {
    console.log("Environement varibles :\n", envs);
  }

  return envs
}

module.exports = {
  env: getVariables(), 
  // Here we can have another module to export
};


