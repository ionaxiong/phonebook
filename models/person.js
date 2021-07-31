require("dotenv").config();
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// if (process.env.length < 3) {
//   console.log(
//     "Please provide the password as an argument: node mongo.js <password>"
//   );
//   process.exit(1);
// }

// const password = process.argv[2];
const url = process.env.MONGODB_URL;

console.log("connecting to MongoDB");

// const name = process.argv[3];
// const number = process.argv[4];

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB: ", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 1,
    unique: true,
    required: true,
  },
  number: {
    type: String,
    minLength: 12,
    required: true,
  },
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: name,
//   number: number,
// });

// person.save().then(() => {
//   console.log(`added ${name} number ${number} to phonebook`);
//   mongoose.connection.close();
// });

// const persons = [
//   {
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

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

module.exports = mongoose.model("Person", personSchema);
