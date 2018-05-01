var express = require("express");
var router = express.Router();

var sports = require('./sportsModule');
sports('andrewyates', 'T4pQsEYsxXop');

router.get("/",function(request,response){
    response.sendFile(__dirname + "/index.html");
});

////////////////////////////////////
////////////////////////////////////////////
router.get("/requestNBA", function(req, res, next) {
	sports.NBA.getNBATeams( function (err, obj) {
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
    console.log(obj);
		res.json({"info":obj});
	});
});
router.get("/requestNBAStats/:name", function(req, res, next) {
	sports.NBA.getNBAPlayerStats( req.query.firstname,req.query.lastname,function (err, obj) {
    		if (err) {
        		return console.log('Error occurred active_players: ' + err);
    		}
    console.log(obj);
		res.json({"info":obj});
	});
});
//////////////////////////////////////////////////
router.get("/requestNBATeam/:name", function(req, res, next) {
	sports.NBA.getNBAPlayers( req.query.teamname,function (err, obj) {
    		if (err) {
        		return console.log('Error occurred active_players: ' + err);
    		}
        console.log(obj);
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
