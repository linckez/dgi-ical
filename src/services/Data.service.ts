// eslint-disable-next-line import/no-unassigned-import
import 'dotenv/config';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { parseString, parseStringPromise } from 'xml2js';
import ical from 'ical-generator';
import moment from 'moment';

export class DataService {
  public async foobar(): Promise<unknown> {
    try {
      const result = await this.fetchData();

      return result;
    } catch (err) {
      throw err;
    }
  }

  private async fetchData(): Promise<unknown> {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://rooms-dgihusetvejle.azurewebsites.net/30.xml',
    };

    try {
      const request = await (await axios.request(options)).data;
      const foo: any = await parseStringPromise(request);

      const cal = ical({ domain: 'github.com', name: 'my first iCal' });

      cal.createEvent({
        start: moment(),
        end: moment().add(1, 'hour'),
        summary: 'Example Event',
        description: 'It works ;)',
        location: 'my room',
        url: 'http://sebbo.net/',
      });

      cal.saveSync('foo.ical');

      // eslint-disable-next-line no-console
      console.log(foo.Events);

      return 'asdasdasdas';
    } catch (err) {
      throw err;
    }
  }
}
