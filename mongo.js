const mongoose = require("mongoose");

if (process.env.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.kkgxr.mongodb.net/phonebook_app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: name,
  number: number,
});

person.save().then(() => {
  console.log(`added ${name} number ${number} to phonebook`);
  mongoose.connection.close();
});

const persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Person.insertMany(persons).then(() => {
//   console.log("persons are added!");
//   mongoose.connection.close();
// });

// Person.find({}).then((result) => {
//   console.log("phonebook:");
//   result.forEach((person) => {
//     console.log(person);
//   });
//   mongoose.connection.close();
// });
