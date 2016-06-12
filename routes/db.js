/**
 * Created by kiko_c on 6/7/16.
 */

var pg = require('pg');
//var bcrypt = require('bcrypt');
//You can run command "heroku config" to see what is Database URL from Heroku belt
var conString = "postgres://kmfcdszjigwmbv:nwxFlg7FEPuHwRlNer9lMGRtOu@ec2-54-247-185-241.eu-west-1.compute.amazonaws.com:5432/da1u238vm4lm4l";
pg.defaults.ssl = true;

module.exports = {

  getUsers: function (req, res) {
    // localhost:3000/db/getUsers
    var client = new pg.Client(conString);
    client.connect();
    var query = client.query("select * from fb_user");
    query.on("row", function (row, result) {
      result.addRow(row);
    });
    query.on("end", function (result) {
      client.end();
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(JSON.stringify(result.rows, null, "    ") + "\n");
      res.end();
    });
  },
  addUser: function (req, res) {

    console.log("username=" + req.query.username);
    console.log("password=" + req.query.password);
    if (req.query.username == null || req.query.password == null || req.query.username == "" || req.query.password == "") {

      res.status(500).send({ error: "Username or password cannot be null." });
      res.end();
    } else {
      var client = new pg.Client(conString);

      //var salt = bcrypt.genSaltSync(10);
      //var hash = bcrypt.hashSync(req.query.password, salt);

      client.connect();

      /*var query = client.query("insert into fb_user (username,password) " +
       "values ('" + req.query.username + "','" + hash + "')");*/
      var query = client.query("insert into fb_user (username,password) " +
        "values ('" + req.query.username + "','" + req.query.password + "')");

      query.on("end", function (result) {
        client.end();
        res.write('Success');
        res.end();
      });
    }
  },
  getUserFavorites: function (req, res) {

    var client = new pg.Client(conString);
    client.connect();
    var query = client.query("select u.id, u.username, f.fav_id from fb_user as u, favorite as f WHERE u.id = " + req.query.userId);

    query.on("row", function (row, result) {
      result.addRow(row);
    });

    query.on("end", function (result) {
      client.end();
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(JSON.stringify(result.rows, null, "    ") + "\n");
      res.end();
    });
  },
  addFavorite: function (req, res) {

    var client = new pg.Client(conString);

        client.connect();

    var userId = undefined;
    /*var query = client.query("SELECT * FROM fb_user WHERE " + "username = " + req.query.username);*/
    var query = client.query("SELECT * FROM fb_user");
    query.on("row", function (row, result) {
      console.log(row.username + " --- " + req.query.username);
      if (row.username === req.query.username) {
        console.log("EXISTS --- " + row.id);
        userId = row.id;
        console.log(" EVENT ID --- " + req.query.eventId);
        console.log(" USER  ID --- " + userId);
        client.query("INSERT INTO favorite (fav_id, fb_user_id) VALUES (" + req.query.eventId + "," + userId + ")");
      }
    });

    query.on("end", function (result) {
      client.end();
      res.write('added to fav');
      res.end();
    });
  },
  removeFavorite: function (req, res) {
    var client = new pg.Client(conString);

    client.connect();

    var query = client.query("SELECT * FROM fb_user");
    query.on("row", function (row, result) {

      if (row.username === req.query.username) {
        client.query("DELETE FROM favorite WHERE fb_user_id = " + row.id + " AND fav_id = " + req.query.eventId);
      }
    });

    query.on("end", function (result) {
      client.end();
      res.write('removed from fav');
      res.end();
    });
  },
  createTable: function (req, res) {

    var client = new pg.Client(conString);

    client.connect();
    client.query("CREATE TABLE IF NOT EXISTS fb_user" +
      "(" +
      "username character varying(15)," +
      "password text," +
      "id serial PRIMARY KEY" +
      ")");

    //var salt = bcrypt.genSaltSync(10);
    //var hash = bcrypt.hashSync("pass", salt);
    //console.log(hash.length);
    //client.query("INSERT INTO fb_user(username, password) values($1, $2)", ["k1ko", hash]);
    client.query("INSERT INTO fb_user(username, password) values($1, $2)", ["test", "test"]);

    var query = client.query("CREATE TABLE IF NOT EXISTS favorite" +
      "(" +
      "fav_id text NOT NULL," +
      "fb_user_id int4 REFERENCES fb_user(id)," +
      "PRIMARY KEY (fav_id, fb_user_id)" +
      ")");
    query.on("end", function (result) {
      client.end();
      res.write('Table Schema Created');
      res.end();
    });
  },
  dropTable: function (req, res) {

    var client = new pg.Client(conString);
    client.connect();
    client.query("Drop TABLE IF EXISTS favorite");
    var query = client.query("Drop TABLE IF EXISTS fb_user");
    query.on("end", function (result) {
      client.end();
      res.write('Table Schema Deleted');
      res.end();
    });
  }
};
