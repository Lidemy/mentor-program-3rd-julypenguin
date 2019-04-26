// 超級挑戰題
const request = require('request');
const process = require('process');

request({
  url: 'https://api.twitch.tv/helix/streams',
  qs: {
    name: process.argv[2],
    first: 100,
  },
  headers:
      { 'Client-ID': '' },
},
(error, response, body) => {
  console.log(response.statusCode);
  let json = JSON.parse(body);
  for (let i = 0; i < json.data.length; i += 1) {
    console.log(`user_id: ${json.data[i].user_id}, userName: ${json.data[i].user_name}`);
  }
  request({
    url: 'https://api.twitch.tv/helix/streams',
    qs: {
      name: process.argv[2],
      first: 100,
      after: 'eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6MTAwfX0',
    },
    headers:
        { 'Client-ID': '' },
  },
  () => {
    json = JSON.parse(body);
    for (let i = 0; i < json.data.length; i += 1) {
      console.log(`user_id: ${json.data[i].user_id}, userName: ${json.data[i].user_name}`);
    }
  });
});
