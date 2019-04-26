const request = require('request');
const process = require('process');

if (process.argv[2] === 'list') {
  request('https://lidemy-book-store.herokuapp.com/books?_limit=10',
    (error, response, body) => {
      const json = JSON.parse(body);
      console.log(response.statusCode);
      for (let i = 0; i < 20; i += 1) {
        console.log(`${json[i].id}\t${json[i].name}`);
      }
    });
} else if (process.argv[2] === 'read') {
  request(`https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
    (error, response, body) => {
      const json = JSON.parse(body);
      console.log(response.statusCode);
      console.log(json.name);
    });
} else {
  console.log('Please enter list or read + number');
}
