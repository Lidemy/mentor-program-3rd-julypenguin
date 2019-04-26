const request = require('request');

request({
  url: 'https://api.twitch.tv/helix/games/top',
  headers:
        { 'Client-ID': 'a52jzuqluym2nwkx9hpl1y5ptv20vv' },
},
(error, response, body) => {
  console.log(response.statusCode);
  const json = JSON.parse(body);
  for (let i = 0; i < json.data.length; i += 1) {
    console.log(`${json.data[i].id}\t${json.data[i].name}`);
  }
});
