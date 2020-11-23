/* eslint-disable no-console */
// eslint-disable-next-line import/no-unassigned-import
import 'dotenv/config';
import { event } from '../models/services';
import axios, { AxiosRequestConfig } from 'axios';
import { parseStringPromise } from 'xml2js';
import ical from 'ical-generator';
import moment from 'moment';
import * as fs from 'fs';

export class DataService {
  public async updateIcal(): Promise<void> {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://rooms-dgihusetvejle.azurewebsites.net/30.xml',
    };

    try {
      // fetch event data
      const request = await axios.request(options);
      const parsedXML: any = await parseStringPromise(request.data);
      const filtered: any[] = parsedXML.Events.Event;
      console.log('fetched data');

      // filter the events to Svømmehallen
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

      console.log(events);

      //create ical content
      const cal = ical({
        domain: 'github.com',
        name: 'DGI Vejle Kalender',
        timezone: 'Europe/Copenhagen',
      }).ttl(60 * 60 * 24); //set refresh interval to 24 hours.

      for (const i of events) {
        cal.createEvent({
          start: moment(i.startTime, 'MM-DD-YYYY HH:mm').toDate(),
          end: moment(i.endTime, 'MM-DD-YYYY HH:mm').toDate(),
          summary: i.eventName,
          location: i.location,
        });
      }
      const timeElapsed = Date.now();
      const today = new Date(Date.now());
      console.log('generated ical calendar');

      //save the ical file
      await cal.saveSync('./public/dgi.ical');
      fs.writeFileSync(
        './public/log.html',
        `<p>Generated on ${new Date(Date.now()).toISOString()}</p>`
      );
    } catch (err) {
      throw err;
    }
  }
}
