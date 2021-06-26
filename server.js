// const express = require('express');
// const { animals } = require('./data/animals');
// const PORT = process.env.PORT || 3001;
// const app = express(); // this instantiates the server


// function filterByQuery(query, animalsArray) {
//   let personalityTraitsArray = [];
//   // Note that we save the animalsArray as filteredResults here:
//   let filteredResults = animalsArray;
//   if (query.personalityTraits) {
//     // Save personalityTraits as a dedicated array.
//     // If personalityTraits is a string, place it into a new array and save.
//     if (typeof query.personalityTraits === 'string') {
//       personalityTraitsArray = [query.personalityTraits];
//     } else {
//       personalityTraitsArray = query.personalityTraits;
//     }
   




//     // Loop through each trait in the personalityTraits array:
//     personalityTraitsArray.forEach(trait => {
//       // Check the trait against each animal in the filteredResults array.
//       // Remember, it is initially a copy of the animalsArray,
//       // but here we're updating it for each trait in the .forEach() loop.
//       // For each trait being targeted by the filter, the filteredResults
//       // array will then contain only the entries that contain the trait,
//       // so at the end we'll have an array of animals that have every one 
//       // of the traits when the .forEach() loop is finished.
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
//   // return the filtered results:
//   return filteredResults;
// }



// // get method here lays out the route to 'animals.json'
// // req is request, res is response, send means to send message back to client
// app.get('/api/animals', (req, res) => {
//     let results = animals;
//     if (req.query) {
//       results = filterByQuery(req.query, results);
//     }
//     console.log(req.query);
//     res.json(results);
//   });

// // A param route must come after the other GET route.
// // findById() is used because it's a single animal (unique ID) and so the code is simpler that filterByQuery()

//   app.get('/api/animals/:id', (req, res) => {
//     const result = findById(req.params.id, animals);
//       res.json(result);
//   });  



// // code goes at the end -- chains the "listen" method to the server:
// app.listen(PORT, () => {
//     console.log(`API server now on port ${PORT}`);
// });

const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();

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

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
