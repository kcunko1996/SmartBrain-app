const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
  });



const app = express();


app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) =>{
    res.send('it wokrs')
});
app.post('/signin',(req,res) => {
   db.select('email','hash').from('login')
   .where('email','=', req.body.email)
   .returning('*')
   .then(data => {
       console.log(data)
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
      if(isValid){
          return db.select('*').from('useres')
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
            return trx('useres')
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
    database.useres.forEach(useres => {
        if(useres.id === id){
            found = true;
           return res.json(useres);
        }
    });
    if(!found){
            res.status(404).json('no such user');
        
    }
});

app.put('/image', (req,res) => {
    const {id} = req.body;
    db('useres').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
       res.json(entries[0])
    })
    .catch(err => {
        res.status(400).json('user not found')
    })
});


app.listen(process.env.PORT || 3000, () =>{
    console.log('slusam na portu 3000')
});

