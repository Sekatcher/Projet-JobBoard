const blob = require('./connectToDatabase.js')
var conn = blob.conn;

exports.getAllwCompany = (req, res) => {
  var sql = 'SELECT ad.id, ad.title, ad.description, ad.location,  ad.idcompany, ad.idpeople, ad.wages, ad.workingTime, cp.name FROM advertisements as ad \
            LEFT JOIN companies as cp \
            ON ad.idcompany = cp.id';
  conn.query(sql, function (err, rows) {
    if (err) throw err;
    res.send(rows);
  })
};

exports.getDescription = (req, res) => {
  var sql = 'SELECT description, location, wages, workingTime\
            FROM advertisements\
            WHERE id = ' + req.query.id;
  conn.query(sql, function (err, rows) {
    if (err) throw err;
    res.send(rows);
  })
};

exports.getAll = (req, res) => {
  var sql = 'SELECT * FROM advertisements';
  conn.query(sql, function (err, rows) {
    if (err) throw err;
    res.send(rows);
  })
};

exports.getRows = (req, res) => {
  var sql = "SELECT * FROM advertisements\
            LIMIT "+ req.params.offset +", 10"  ;
  conn.query(sql, function (err, rows) {
    if (err) throw err;
    res.send(rows);
  })
};

exports.getIt = (req, res) => {
  var sql = 'select * from advertisements where id=?';
  conn.query(sql, [req.params.id],function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
}

exports.post = (req, res) => {
  var sql = 'INSERT INTO advertisements SET ?';
  conn.query(sql, [req.body],function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
}



exports.delete = (req, res) => {
  var sql = 'DELETE FROM advertisements WHERE ?';
  conn.query(sql, [req.body],function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
}

exports.update = (req, res) => {
  var sql = 'UPDATE advertisements SET ?  WHERE id=?';
  conn.query(sql, [req.body , req.body.id],function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
}

