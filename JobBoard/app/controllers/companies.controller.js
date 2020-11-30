const blob = require('./connectToDatabase.js')
var conn = blob.conn;

exports.getAll = (req, res) => {
    var sql = 'SELECT * FROM companies';
    conn.query(sql, function (err, rows) {
      if (err) throw err;
      res.send(rows);
    })
  };

exports.getRows = (req, res) => {
  var sql = "SELECT * FROM companies\
            LIMIT "+ req.params.offset +", 10"  ;
  conn.query(sql, function (err, rows) {
    if (err) throw err;
    res.send(rows);
  })
};

exports.getIt = (req, res) => {
  var sql = 'select * from companies where id=?';
  conn.query(sql, [req.params.id],function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
}

exports.post = (req, res) => {
  var sql = 'INSERT INTO companies SET ?';
  conn.query(sql, [req.body],function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
}

exports.delete = (req, res) => {
  var sql = 'DELETE FROM companies WHERE ?';
  conn.query(sql, [req.body],function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
}

exports.update = (req, res) => {
  var sql = 'UPDATE companies SET ?  WHERE id=?';
  conn.query(sql, [req.body , req.body.id],function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
}