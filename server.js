

// const express = require('express');
// const { animals } = require('./data/animals');

// const fs = require('fs');
// const path = require('path');

// const PORT = process.env.PORT || 3001;
// const app = express();


// // app.use() method is a form of middleware
// // it's a method executed by the Express.js server that mounts a funtion to the server that requests will pass through 

// // parse incoming string or array data
// app.use(express.urlencoded({ extended: true })); // extended: true tells the server that there may be sub-array data nested in it as well
// // parse incoming JSON data
// app.use(express.json()); // takes incoming POST data in the form of JSON and parses it into the req.body JavaScript object



// function filterByQuery(query, animalsArray) {
//   let personalityTraitsArray = [];
//   let filteredResults = animalsArray;
//   if (query.personalityTraits) {
//     if (typeof query.personalityTraits === 'string') {
//       personalityTraitsArray = [query.personalityTraits];
//     } else {
//       personalityTraitsArray = query.personalityTraits;
//     }
//     personalityTraitsArray.forEach(trait => {
//       filteredResults = filteredResults.filter(
//         animal => animal.personalityTraits.indexOf(trait) !== -1
//       );
//     });
//   }
//   if (query.diet) {
//     filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
//   }
//   if (query.species) {
//     filteredResults = filteredResults.filter(animal => animal.species === query.species);
//   }
//   if (query.name) {
//     filteredResults = filteredResults.filter(animal => animal.name === query.name);
//   }
//   return filteredResults;
// }



// function findById(id, animalsArray) {
//   const result = animalsArray.filter(animal => animal.id === id)[0];
//   return result;
// }

// function createNewAnimal(body, animalsArray) {
//   const animal = body;
//   animalsArray.push(animal);
//   fs.writeFileSync(
//     path.join(__dirname, './data/animals.json'),
//     JSON.stringify({ animals: animalsArray }, null, 2)
//   );
//   return animal;
// }


// app.get('/api/animals', (req, res) => {
//   let results = animals;
//   if (req.query) {
//     results = filterByQuery(req.query, results);
//   }
//   res.json(results);
// });

// app.get('/api/animals/:id', (req, res) => {
//   const result = findById(req.params.id, animals);
//   if (result) {
//     res.json(result);
//   } else {
//     res.send(404);
//   }
// });

// app.post('/api/animals', (req, res) => {
//   // req.body is where our incoming content will be
//   console.log(req.body); // view the data we're posting to the server
//     // set id based on what the next index of the array will be
//     req.body.id = animals.length.toString();
//   res.json(req.body); // send the data back to the client
// });


// app.listen(PORT, () => {
//   console.log(`API server now on port ${PORT}!`);
// });

const fs = require('fs');
const path = require('path');
const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();

// app.use() method is a form of middleware
// it's a method executed by the Express.js server that mounts a funtion to the server that requests will pass through 

// parse incoming string or array data

app.use(express.urlencoded({ extended: true })); // extended: true tells the server that there may be sub-array data nested in it as well
app.use(express.json()); // takes incoming POST data in the form of JSON and parses it into the req.body JavaScript object

function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    if (typeof query.personalityTraits === 'string') {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    personalityTraitsArray.forEach(trait => {
      filteredResults = filteredResults.filter(
        animal => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  }
  if (query.species) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  return filteredResults;
}

function findById(id, animalsArray) {
  const result = animalsArray.filter(animal => animal.id === id)[0];
  return result;
}

function createNewAnimal(body, animalsArray) {
  const animal = body;
  animalsArray.push(animal);
  fs.writeFileSync(
    path.join(__dirname, './data/animals.json'),
    JSON.stringify({ animals: animalsArray }, null, 2) // The null argument means we don't want to edit any of our existing data; if we did, we could pass something in there. The 2 indicates we want to create white space between our values to make it more readable.
  );
  // console.log(path);
  return animal;
}

function validateAnimal(animal) {
  if (!animal.name || typeof animal.name !== 'string') {
    return false;
  }
  if (!animal.species || typeof animal.species !== 'string') {
    return false;
  }
  if (!animal.diet || typeof animal.diet !== 'string') {
    return false;
  }
  if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
    return false;
  }
  return true;
}

app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.post('/api/animals', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
  } else {
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

