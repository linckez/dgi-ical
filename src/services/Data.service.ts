// eslint-disable-next-line import/no-unassigned-import
import 'dotenv/config';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { ParserOptions, parseString, parseStringPromise } from 'xml2js';
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
      const jsonData: any = await parseStringPromise(request);
      const events: any = jsonData.Events.Event;

      const cal = ical({ domain: 'github.com', name: 'my second iCal' });

      cal.createEvent({
        start: '11-17-2020 09:45',
        end: '11-17-2020 16:00',
        summary: 'Indgang til DK-CAMP leverand�rmesse',
        description: 'Ind Vest',
        location: 'Indgang Vest',
      });

      cal.saveSync('foo.ical');

      // eslint-disable-next-line no-console
      console.log(events);

      return 'asdasdasdas';
    } catch (err) {
      throw err;
    }
  }
}
