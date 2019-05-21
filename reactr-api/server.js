const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'user',
      database : 'smart-brain'
    }
  });



const app = express();


app.use(bodyParser.json());
app.use(cors());
const database = {
    users: [
        {
            id: '123',
            name: 'jhon',
            email: 'jhon@gmail.com',
            password: 'password',
            entries: 1,
            joined: new Date()
        },
        {
            id: '125',
            name: 'sally',
            email: 'sally@gmail.com',
            passwod: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            has: '',
            email: 'jhon@gmail.com'
        }
    ]
}

app.get('/',(req,res) =>{
    res.send(database.users)
});
app.post('/signin',(req,res) => {
   db.select('email','hash').from('login')
   .where('email','=', req.body.email)
   .returning('*')
   .then(data => {
       console.log(data)
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
      if(isValid){
          return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          })
          .catch( err =>{
              res.status(400).json('unable to get user');
          })
          
      }
      else{
          res.status(400).json('wrong credidentals')
      }
   })
   .catch( err =>{
    res.status(400).json('wrong credidentals');
})
     
});  

app.post('/register', (req,res) => {
    const {email,name,password} = req.body;
    const hash = bcrypt.hashSync(password)
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(userEmail =>{
            return trx('users')
            .insert({
                email:userEmail[0],
                name: name, 
                joined: new Date()
            })
            .returning('*')
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {
        res.status(400).json('unable to register')
    })
});
app.get('/profile/:id', (req,res)=> {
    const {id} = req.params;
    let found = false;
    database.users.forEach(users => {
        if(users.id === id){
            found = true;
           return res.json(users);
        }
    });
    if(!found){
            res.status(404).json('no such user');
        
    }
});

app.put('/image', (req,res) => {
    const {id} = req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
       res.json(entries[0])
    })
    .catch(err => {
        res.status(400).json('user not found')
    })
});


app.listen(3000, () =>{
    console.log('slusam na portu 3000')
});

