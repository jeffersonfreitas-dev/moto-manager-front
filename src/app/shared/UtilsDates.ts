export class UtilsDate {
  static formatData(data: string): string {
    if (data !== '') {
      let dia = data.substring(0, 2);
      let mes = data.substring(2, 4);
      let ano = data.substring(4, 8);
      let dataFormat = ano + '-' + mes + '-' + dia;
      return dataFormat;
    } else {
      return '';
    }
  }
}
