const moment = require('moment');
const settings = require('./settings');

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

// Find people function, searches for people in database
knex.select('id', 'first_name', 'last_name', 'birthdate').from('famous_people')
  .where('first_name', '=', `${process.argv[2]}`).orWhere('last_name', '=', `${process.argv[2]}`)
  .asCallback(function(err, rows) {
    if (err) return console.error(err);

    rows.forEach(info => {
      console.log(`- ${info.id}: ${info.first_name} ${info.last_name}, born '${moment(info.birthdate).format('YYYY-MM-DD')}'`);
    });

    knex.destroy();
  });
