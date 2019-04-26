const request = require('request');
const process = require('process');

if (process.argv[2] === 'list') {
  request('https://lidemy-book-store.herokuapp.com/books?_limit=20',
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
} else if (process.argv[2] === 'delete') {
  request.delete(`https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
    (error, response) => {
      console.log(response.statusCode);
      console.log(`delete ${process.argv[3]}`);
    });
} else if (process.argv[2] === 'create') {
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books',
      form: {
        id: '',
        name: process.argv[3],
      },
    },
    (error, response, body) => {
      const json = JSON.parse(body);
      console.log(response.statusCode);
      console.log(`create\t${json.id}\t${json.name}`);
    },
  );
} else if (process.argv[2] === 'update') {
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      form: {
        name: process.argv[4],
      },
    },
    (error, response, body) => {
      const json = JSON.parse(body);
      console.log(response.statusCode);
      console.log(`update\t${json.id}\t${json.name}`);
    },
  );
} else {
  console.log('please enter a method (list / read / delete / create / update)');
}
