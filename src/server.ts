// eslint-disable-next-line import/no-unassigned-import
import 'dotenv/config';
import { DataService } from './services/Data.service';

// Services
const data = new DataService();

async function main() {
  await data.updateIcal();
}
main();
