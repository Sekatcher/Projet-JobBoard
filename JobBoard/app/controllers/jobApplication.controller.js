const blob = require('./connectToDatabase.js')
var conn = blob.conn;

exports.postJobAppNewUser = (req, res) => {
  console.log(req.body)
  var sql = "INSERT INTO people (name, mail, password, phone)\
             VALUES ("+req.body.name+", "+ req.body.email +", " + req.body.password +", "+ req.body.phone +")";
  conn.query(sql, function (err, rows) {
    if (err) throw err;
      var sql = "SELECT p.id as idapplier, a.idpeople as idprovider FROM people as p\
             LEFT JOIN advertisements as a\
             ON a.id = "+ req.body.idJob +"\
             ORDER BY p.id DESC LIMIT 1;";
    conn.query(sql, function (err, rows) {
      if (err) throw err;
      var sql = "INSERT INTO job_application (idprovider, idapplier, idadvertisement, jobApplicationMessage)\
              VALUES ("+rows[0].idprovider+", "+ rows[0].idapplier +", " + req.body.idJob +", "+ req.body.message +");"
        conn.query(sql, function (err, rows) {
        if (err) throw err;
        res.send(rows);
      })
    })
  })
}

exports.postJobApp = (req, res) => {
  console.log(req.body)
  var sql = "SELECT p.id as idapplier, a.idpeople as idprovider FROM people as p\
          LEFT JOIN advertisements as a\
          ON a.id = "+ req.body.idJob +"\
          WHERE p.id = " + req.body.idUser +";";
  conn.query(sql, function (err, rows) {
    if (err) throw err;
    var sql = "INSERT INTO job_application (idprovider, idapplier, idadvertisement, jobApplicationMessage)\
            VALUES ("+rows[0].idprovider+", "+ rows[0].idapplier +", " + req.body.idJob +", "+ req.body.message +");"
      conn.query(sql, function (err, rows) {
      if (err) throw err;
      res.send(rows);
    })
  })
}

exports.getAll = (req, res) => {
  var sql = 'SELECT * FROM job_application';
  conn.query(sql, function (err, rows) {
    if (err) throw err;
    res.send(rows);
  })
};

exports.getRows = (req, res) => {
  var sql = "SELECT * FROM job_application\
            LIMIT "+ req.params.offset +", 10"  ;
  conn.query(sql, function (err, rows) {
    if (err) throw err;
    res.send(rows);
  })
};

exports.getIt = (req, res) => {
  var sql = 'select * from job_application where id=?';
  conn.query(sql, [req.params.id],function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
}

exports.post = (req, res) => {
  var sql = 'INSERT INTO job_application SET ?';
  conn.query(sql, [req.body],function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
}

exports.delete = (req, res) => {
  var sql = 'DELETE FROM job_application WHERE ?';
  conn.query(sql, [req.body],function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
}

exports.update = (req, res) => {
  var sql = 'UPDATE job_application SET ?  WHERE id=?';
  conn.query(sql, [req.body , req.body.id],function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
}