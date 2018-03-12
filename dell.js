function DellController() {

  var that = this;
  var https = require("https");
  //var url_p1 = "https://www.dell.com/support/home/us/en/19/product-support/servicetag/5t8sm02/research";
  var url_p1 = "https://www.dell.com/support/home/us/en/19/product-support/servicetag/";
  var url_p2 = "/research";


  // RETREIVE ALL ITEMS MATCHING A PARAMETER
  that.getByValue = function(req,res,next) {

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');

    value = req.params.value;
    var url = "";
    url += url_p1;
    url += value;
    url += url_p2;

    console.log(url);

    https.get(url, resp => {

      //console.log(resp);

      resp.setEncoding("utf8");
      let body = "";

      resp.on("err", err => {
        res.json({"status":"error"});
      });

      resp.on("data", data =>{
        body += data;
      });

      resp.on("end", () => {
        lines = body.split("\n");
        line = lines[13];

        if (line == null) {
          res.json({"status":"error"});
        }
        else {
          parts = line.split("|");
          info = parts[0].split(" ");
          var results = {};
          results.status = "SUCCESS";
          results.data = info[6] + " " + info[7];
          res.json(results);
        }

      });
    });

    next();
  };


};
module.exports = new DellController();
