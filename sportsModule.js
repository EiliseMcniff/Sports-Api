var MAX_PLAYERS = 10;
var Client = require('node-rest-client').Client;

var client = new Client();

var args = {
    port: '443',
    headers: { "User-Agent": "node " + process.version }
};
client.registerMethod("getNHLTeams",
"https://www.mysportsfeeds.com/api/feed/pull/nhl/2015-2016-regular/overall_team_standings.json", "GET");

client.registerMethod("getNHLPlayer",
"https://www.mysportsfeeds.com/api/feed/pull/nhl/2015-2016-regular/active_players.json", "GET");

client.registerMethod("getNBATeams",
"https://www.mysportsfeeds.com/api/feed/pull/nba/2015-2016-regular/overall_team_standings.json", "GET");

client.registerMethod("getNBAPlayer",
"https://www.mysportsfeeds.com/api/feed/pull/nba/2015-2016-regular/active_players.json", "GET");



module.exports = function (username, password) {
    args.headers["Authorization"] = "Basic " + Buffer.from(username + ':' + password).toString('base64');
}

///////////////////////////////////////////////

module.exports["NHL"] = {
    getNHLTeams: function ( fn) {
    client.methods.getNHLTeams(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);
        var obj = data.overallteamstandings.teamstandingsentry;
      //  obj.length = MAX_PLAYERS;
            fn(false, obj);
        });
    },
    getNHLPlayer: function ( firstname,lastname,fn) {
      client.methods.getNHLPlayer(args, function (data, response) {

           if (response.statusCode !== 200) return fn(response.statusCode);
       var obj = data.activeplayers.playerentry;
       var returnObj = undefined;
       obj.forEach(function(users){
         if(users.player)
         {
           if(users.player.FirstName.toLowerCase() == firstname.toLowerCase())
           {
             if(users.player.LastName.toLowerCase() == lastname.toLowerCase())
             {
               returnObj = users;
             }
           }
         }
       });
          fn(false, returnObj);
     });
   },
   getNHLPlayers: function ( teamname,fn) {
         client.methods.getNHLPlayer(args, function (data, response) {
              if (response.statusCode !== 200) return fn(response.statusCode);
          var obj = data.activeplayers.playerentry;

          var returnObject = [];
          obj.forEach(function(users){
          //  console.log(users.team);
            if(users.team)
            {
              if(users.team.Name.toLowerCase() == teamname.toLowerCase())
              {
                    returnObject.push(users);
              }
            }

          });
          console.log(returnObject);
    //   obj.length = MAX_PLAYERS;

           fn(false, returnObject);
       });
   }
}
//////////////////////////////////////////////////////////////////////////////////////
module.exports["NBA"] = {
    getNBATeams: function ( fn) {
    client.methods.getNBATeams(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);
        var obj = data.overallteamstandings.teamstandingsentry;
        //obj.length = MAX_PLAYERS;
            fn(false, obj);
        });
    },
     getNBAPlayer: function ( firstname,lastname,fn) {
       client.methods.getNBAPlayer(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);
        var obj = data.activeplayers.playerentry;
        var returnObj = undefined;
        obj.forEach(function(users){
          if(users.player){
            if(users.player.FirstName.toLowerCase() == firstname.toLowerCase())
            {
              if(users.player.LastName.toLowerCase() == lastname.toLowerCase())
              {

                  returnObj = users;
              }
            }
          }

        });
        obj.length = MAX_PLAYERS;
            fn(false, returnObj);
        });
    },
     getNBAPlayers: function ( teamname,fn) {
       client.methods.getNBAPlayer(args, function (data, response) {
            if (response.statusCode !== 200) return fn(response.statusCode);
        var obj = data.activeplayers.playerentry;
        var returnObject = [];
        obj.forEach(function(users){
        //  console.log(users.team);
          if(users.team)
          {
            if(users.team.Name.toLowerCase() == teamname.toLowerCase())
            {
                  returnObject.push(users);
            }
          }

        });
        console.log(returnObject);
  //   obj.length = MAX_PLAYERS;

         fn(false, returnObject);
        });
    }
}
