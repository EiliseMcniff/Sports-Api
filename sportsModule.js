var MAX_PLAYERS = 10;
var Client = require('node-rest-client').Client;

var client = new Client();

var args = {
    port: '443',
    headers: { "User-Agent": "node " + process.version }
};
client.registerMethod("getActivePlayers", "https://www.mysportsfeeds.com/api/feed/pull/nhl/2015-2016-regular/overall_team_standings.json", "GET");

client.registerMethod("getActiveNBAPlayers", "https://www.mysportsfeeds.com/api/feed/pull/nba/2015-2016-regular/active_players.json", "GET");

module.exports = function (username, password) {
    args.headers["Authorization"] = "Basic " + Buffer.from(username + ':' + password).toString('base64');
}

///////////////////////////////////////////////

module.exports["NHL"] = {
    getActivePlayers: function ( fn) {
    client.methods.getActivePlayers(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);
        var obj = data.activeplayers.playerentry;
        obj.length = MAX_PLAYERS;
            fn(false, obj);
        });
    }
}


module.exports["NBA"] = {
    getActiveNBAPlayers: function ( fn) {
    client.methods.getActiveNBAPlayers(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);
        var obj = data.activeplayers.playerentry;
        obj.length = MAX_PLAYERS;
            fn(false, obj);
        });
    },
     getNBAPlayer: function ( firstname,lastname,fn) {
       client.methods.getActiveNBAPlayers(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);
        var obj = data.activeplayers.playerentry;
        var returnObj;
        obj.forEach(function(users){
            if(users.player.FirstName.toLowerCase() == firstname.toLowerCase())
            {
              if(users.player.LastName.toLowerCase() == lastname.toLowerCase())
              {

                  returnObj = users;
              }
            }

        });
        obj.length = MAX_PLAYERS;
            fn(false, returnObj);
        });
    }
}
