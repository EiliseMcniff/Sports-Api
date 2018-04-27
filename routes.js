var express = require("express");
var router = express.Router();

var sports = require('./sportsModule');
sports('andrewyates', 'T4pQsEYsxXop');

router.get("/",function(request,response){
    response.sendFile(__dirname + "/index.html");
});

////////////////////////////////////

router.get("/requestNHL", function(req, res, next) {
	sports.NHL.getNHLTeams( function (err, obj) {
    		if (err) {
        		return console.log('Error occurred active_players: ' + err);
    		}
var result = JSON.stringify(obj);
console.log(result);
		res.json({"info":obj});
	});
});
/////////////////////////////////////////////////////
router.get("/requestNHL/:name", function(req, res, next) {
	sports.NHL.getNHLPlayer( req.query.firstname,req.query.lastname,function (err, obj) {
    		if (err) {
        		return console.log('Error occurred active_players: ' + err);
    		}
		res.json({"info":obj});
	});
});
////////////////////////////////////////////
router.get("/requestNBA", function(req, res, next) {
	sports.NBA.getNBATeams( function (err, obj) {s
    		if (err) {
        		return console.log('Error occurred active_players: ' + err);
    		}
var result1 = JSON.stringify(obj);
console.log(result1);
		res.json({"info":obj});
	});
});
//////////////////////////////////////////////////
router.get("/requestNBA/:name", function(req, res, next) {
	sports.NBA.getNBAPlayer( req.query.firstname,req.query.lastname,function (err, obj) {
    		if (err) {
        		return console.log('Error occurred active_players: ' + err);
    		}
		res.json({"info":obj});
	});
});

////////////////////////////////////

router.use(function(req,res,next) {
	next();
});

router.use(function(req,res) {
	res.statusCode = 404;
	res.end("404!");
});

module.exports = router;
