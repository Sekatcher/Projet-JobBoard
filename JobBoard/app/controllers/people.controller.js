const blob = require('./connectToDatabase.js')
var conn = blob.conn;

exports.getAll = (req, res) => {
  var sql = 'SELECT * FROM people';
  conn.query(sql, function (err, rows) {
    if (err) throw err;
  })
};

exports.getRows = (req, res) => {
  var sql = "SELECT * FROM people\
            LIMIT "+ req.params.offset +", 10"  ;
  conn.query(sql, function (err, rows) {
    if (err) throw err;
    res.send(rows);
  })
};

exports.getIt = (req, res) => {
  var sql = 'select * from people where id=?';
  conn.query(sql, [req.params.id],function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
}

exports.post = (req, res) => {
  var sql = 'INSERT INTO people SET ?';
  conn.query(sql, [req.body],function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
}

exports.delete = (req, res) => {
  var sql = 'DELETE FROM people WHERE ?';
  conn.query(sql, [req.body],function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
}

exports.update = (req, res) => {
  var sql = 'UPDATE people SET ?  WHERE id=?';
  conn.query(sql, [req.body , req.body.id],function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
}