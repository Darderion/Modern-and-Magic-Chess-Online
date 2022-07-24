class DateConverter {
  constructor() {}

  toDatabaseDateTime(date) {
    const data = date.toISOString().split('T');
    const dbDate = data[0];
    const dbTime = data[1].split('.')[0];

    return `${dbDate} ${dbTime}`;
  }
}

module.exports = new DateConverter();
