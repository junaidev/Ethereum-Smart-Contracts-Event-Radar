'use strict';

var fs = require("fs");
var data_file = "eventsdata.json";

exports.listLogs = function (req, res) {
  console.log("List ENS Events Log Restful Call");
  fs.readFile(__dirname + "/" + data_file, 'utf8', function (err, data) {
    if (data != "") {
      data = JSON.parse(data);
      //console.log(data);
      console.log("Data retrieved, now sending.");
      res.json(data);
    }
    else {
      res.end();
    }
  });
};



exports.createLog = function (req, res) {
  console.log("save ENS Event Log Restful Call");
  console.log(req.body);      // your JSON

  //first read existing records
  fs.readFile(__dirname + "/" + data_file, 'utf8', function (err, data) {
    var pdata = JSON.parse(data);
    pdata.push(req.body);
    //res.end( JSON.stringify(data));

    fs.writeFile(__dirname + "/" + data_file, JSON.stringify(pdata), function (err) {
      if (err) throw err;
    });

  });
  res.json({status: "ok"});
};

exports.readLog = function (req, res) {
  console.log("List ENS Events Log Restful Call");
  fs.readFile(__dirname + "/" + data_file, 'utf8', function (err, data) {
    var lid = req.params.eventId;
    //console.log("query string param "+lid);
    data = JSON.parse(data);
    for (var key in data) {
      if (data[key].value.hash == lid) {
        res.json(data[key]);
        break;
      }
    }
    res.end();
  });
};
