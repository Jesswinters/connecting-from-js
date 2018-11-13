const pg = require('pg');
const moment = require('moment');
const settings = require('./settings');

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

// const input = process.argv[2];

const findPeople = ((db, name) => {
  const input = `SELECT * FROM famous_people WHERE first_name ILIKE $1::text OR last_name ILIKE $1::text;`;

  db.query(input, [name], (err, result) => {
    const resultArray = result.rows;

    if (err) {
      return console.error('error running query', err);
    } else {
      console.log(`Found ${result.rows.length} person(s) by the name '${name}'`);

      resultArray .forEach(info => {
        console.log(`- ${info.id}: ${info.first_name} ${info.last_name}, born '${moment(info.birthdate).format('YYYY-MM-DD')}'`);
      });
    }

    db.end();
  });
});

client.connect((err) => {
  console.log('Searching ...');

  if (err) {
    return console.error('Connection Error', err);
  }

  findPeople(client, process.argv[2]);
});
