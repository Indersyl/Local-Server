const { pool } = require("./db");

async function insertData() {
  const [id, name, specialty, schedule] = process.argv.slice(4);
  console.log(id, name, specialty, schedule);
  console.log('added a doctor named ${name}');
}

insertData();