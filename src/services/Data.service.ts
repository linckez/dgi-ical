// eslint-disable-next-line import/no-unassigned-import
import 'dotenv/config';

export class DataService {
  public async foobar() {
    try {
      const result = await this.fetchData();

    } catch (err) {
      throw err;
    }
  }

  private async fetchData(): Promise<string> {

    return '';
  }
}
