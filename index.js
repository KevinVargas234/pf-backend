const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const PORT = 3002

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3002, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});