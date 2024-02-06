export class Utils {
  static functionGetDate(data: string) {
    if (data) {
      let date = new Date(data);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      return date;
    }
    return '';
  }
}