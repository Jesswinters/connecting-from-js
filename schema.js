const knexfile = require('./knexfile');
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(knexfile[environment]);

knex.schema.createTable('milestones', function (table) {
  table.increments('id').primary();
  table.string('description');
  table.date('date_achieved');
  table.timestamps();
}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});
