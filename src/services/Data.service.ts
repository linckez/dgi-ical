/* eslint-disable no-console */
// eslint-disable-next-line import/no-unassigned-import
import 'dotenv/config';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { ParserOptions, parseString, parseStringPromise } from 'xml2js';
import ical from 'ical-generator';
import moment from 'moment';

export type event = {
  startTime: string;
  endTime: string;
  location: string;
  eventName: string;
  roomId: number;
};

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
      const filtered: any[] = jsonData.Events.Event;

      const events: event[] = filtered
        .map((v) => {
          return {
            startTime: v.Starttime[0],
            endTime: v.Endtime[0],
            location: v.RoomDescription[0],
            eventName: v.Eventname[0],
            roomId: Number(v.RoomUsage[0]),
          };
        })
        .filter((v) => v.roomId === 6);

      const cal = ical({ domain: 'github.com', name: 'DGI Vejle Kalender' });

      for (const i of events) {
        cal.createEvent({
          start: i.startTime,
          end: i.endTime,
          summary: i.eventName,
          location: i.location,
        });
      }

      await cal.saveSync('./public/dgi.ical');

      console.log(events);

      return 'Done';
    } catch (err) {
      throw err;
    }
  }
}
