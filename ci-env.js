/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { writeFileSync } from 'fs';

const generateEnv = () => {
  return `
  MHS_BASICAUTH = ""
  MHS_BASEURL = ""
  MHS_LANGUAGE = ""
  MHS_DB_POSTFIX = ""
  PORT = 
  HEADLESS_MODE  = "true"
  SERVICENAME = "mox-mhs-service"
  STAGE = ""
  LOCATION = ""
  MHS_DB_USERNAME = ""
  MHS_DB_PASSWORD = ""
  MHS_DB_SERVER = ""
  MHS_DB_DATABASE = ""
  MAGUIRE_DB_USERNAME = ""
  MAGUIRE_DB_PASSWORD = ""
  MAGUIRE_DB_SERVER = ""
  MAGUIRE_DB_DATABASE = ""
`;
};

writeFileSync('.env', generateEnv());
