const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
    console.log('give password/password and name+number as argument')
    process.exit(1)
  }
  
  const url =
    `mongodb+srv://luksi:${process.argv[2]}@cluster0-y9qxp.mongodb.net/phonebook?retryWrites=true&w=majority`
  
  mongoose.connect(url, { useNewUrlParser: true })
  
  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })
  
  const Person = mongoose.model('Person', personSchema)
  
  const savePerson = () => {

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
      })

    person.save().then(response => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
        mongoose.connection.close();
      })
  }

  const findPersons = () => {
      console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(dude => {
          console.log(`${dude.name} ${dude.number}`)
          //console.log(`${dude.number}`)
        })
        mongoose.connection.close()
      })
  }

  if ( process.argv.length === 3) {
    findPersons()
} else if ( process.argv.length === 5) {
    savePerson()
} else {
    console.log('too many arguments')
}

  