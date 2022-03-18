var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`
        CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          device_id TEXT,
          msg_seq_number INTEGER,
          data TEXT,
          time INTEGER,
          device_type_id TEXT,
          `,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created
                }
            });
    }
});


module.exports = db