const express = require('express');
const app = express();
const currentTime = new Date();
var morgan = require('morgan')


app.use(express.json());

morgan.token('body', (req,res) =>{
return JSON.stringify(req.body)
    

})

app.use(morgan(':method :url :response-time ms :body'))
// const requestLogger = (request, response, next) =>{

//   console.log("Request:", request.method)
//   console.log("Path:", request.path)
//   console.log("Body:", request.body)
//   console.log('---')
//   next()
//   }

//   const unknownEndpoint = (request, response) =>{
//   response.status(404).json({error: 'unknown endpoint'})
//   }





// app.use(requestLogger)

const persons = 
[
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get('/', (req,res) => {
res.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (req,res) =>{
    res.json(persons)
})

app.get('/info', (req,res) => {
    res.send(`Phonebook has info for ${persons.length} people <br><br>
    ${currentTime}`)
})

app.get('/api/persons/:id', (req,res) => {
const id = Number(req.params.id)
const personsId = persons.find(user => user.id === id)

// console.log(typeof personsId.id, typeof id)

if(personsId){
  res.json(personsId)
} else {
res.sendStatus(404).end()
}
})

const idGenerator = () => {
const maxId = persons.length > 0
? Math.round(Math.random() * 1000000 ) : 0

return maxId;
}

app.post('/api/persons', (req , res) => {
const body = req.body

  if (!body.name && !body.number){
    return res.status(400).json({
    error:'There is no name and number. Please input a name and number.'})
  } else if (body.name === undefined){
    return res.status(400).json({
      error: 'The name field is empty. Please input a name.'
    })
  } else if (body.number === undefined){
    return res.status(400).json({
      error: "The number field is empty. Please input a phone number."
    })
  }

  if(persons.find(user => user.name === body.name) ){
    return res.status(400).json({
      error: `name must be unique.`
    })
  }

const newName = {
name: body.name,
number: body.number,
id: idGenerator(),
} 
// console.log("This object contains:", newName)

persons.push(newName)

res.json(newName)

})

app.delete('/api/persons/:id', (req,res) =>{
    const id = Number(req.params.id)
    const deleteName = persons.filter(user => user.id === id)
  
    // console.log("this has been deleted ", id)
res.send(deleteName)
})

// app.use(unknownEndpoint)

app.listen(3001, () =>{
console.log("Server is up and running")

})