require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const Person = require("./models/person");
const { request, response } = require("express");

app.use(express.static("build"));
app.use(express.json());
app.use(cors());
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

// const generateId = () => {
//     const id = Math.floor(Math.random() * 10000 + 1);
//     return id;
// }

// app.get("/info", (request, response) => {
//     const personsCount = persons.length;
//     const date = new Date();
//     response.send(`Phonebook has info for ${personsCount} people <br/> ${date}`);
// });

// app.get("/api/persons", (request, response) => {
//     response.json(persons);
// });

// app.get("/api/persons/:id", (request, response) => {
//     const id = Number(request.params.id);
//     const person = persons.find(person => person.id === id);
//     if (person) {
//         response.json(person)
//     } else {
//         response.status(404).end()
//     }
// });

// app.post("/api/persons", (request, response) => {
//     const body = request.body;
//     const person = {
//         id: generateId(),
//         name: body.name,
//         number: body.number,
//     }

//     if (!(body.name && body.number)) {
//         return response.status(400).json({
//             error: 'The name or number is missing'
//         })
//     } else if (persons.find(person => person.name === body.name)) {
//         return response.status(400).json({
//             error: 'The name already exists in the phonebook'
//         })
//     }

//     persons = persons.concat(person);
//     response.json(person)
// })

// app.delete("/api/persons/:id", (request, response) => {
//     const id = Number(request.params.id);
//     persons = persons.filter(person => person.id !== id)
//     response.status(204).end();
// })

app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
    console.log(person);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!(body.name && body.number)) {
    return response
      .status(400)
      .json({ error: "The name or the number is missing!" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((newPerson) => {
    response.json(newPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port${PORT}`);
});
