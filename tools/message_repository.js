class MessageRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY,
          device_id TEXT,
          msg_seq_number INTEGER,
          data TEXT,
          time INTEGER,
          device_type_id TEXT,
          `
        return this.dao.run(sql)
    }

    create(device_id, msg_seq_number, data, time, device_type_id) {
        return this.dao.run(
            'INSERT INTO messages (device_id, msg_seq_number, data, time, device_type_id) VALUES (?,?,?,?)', [device_id, msg_seq_number, data, time, device_type_id])
    }

    // getById(device_id) {
    //     return this.dao.get(
    //         `SELECT * FROM messages WHERE device_id = ?`, [device_id])
    // }

    getAll(device_id) {
        return this.dao.all(`SELECT * FROM messages WHERE device_id = ?`, [device_id])
    }
}

module.exports = MessageRepository;