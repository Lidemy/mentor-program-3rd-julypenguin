const request = require('request');

request({
  url: 'https://api.twitch.tv/helix/games/top',
  headers:
        { 'Client-ID': '' },
},
(error, response, body) => {
  console.log(response.statusCode);
  const json = JSON.parse(body);
  for (let i = 0; i < json.data.length; i += 1) {
    console.log(`${json.data[i].id}\t${json.data[i].name}`);
  }
});
