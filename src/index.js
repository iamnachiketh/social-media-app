const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser')
const db_operations = require("./dbCurdOperations");
const Users = require('./users');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const requireLogin = require('../middleware/requireLogin');

const JWT_SECRET = "NACHIKETHKC" 

app.use(bodyParser.json({ type: 'application/json' }))



app.post('/users', async (req, res) => {
  console.log('Started to insert data!', req.body);
  await db_operations.insertUser(req.body)
  // console.log('Json: ', JSON.parse(req.body));
  res.send("ok")
});

app.get('/users/:username', (req, res) => {

  Users.find(({ name: req.params.username }), (err, result) => {
    if (err) {
      console.log(err);
      res.send(err)
    } else {
      console.log(result);
      res.send(result);
    }
  })

});

app.get('/users/:username/followers', (req, res) => {


});

app.get('/users/:username/following', (req, res) => {


});

//before using this follow please use login route first after login please
// do add authorization token in the postman since user has to be loggined to follow someone.
 
app.post('users/:username/follow', requireLogin ,(req, res) => {

  const fetchId = Users.find({ name: req.params.username })
  console.log(req.params.username);
  Users.findByIdAndUpdate(fetchId.userId, {
    $push: { followers: req.user.userId }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      res.send('follower error', err);
    }else{
      res.send('followed',result)
    }
    Users.findByIdAndUpdate(req.user.userId, {
      $push: { following: fetchId.userId }
    }, { new: true }, (err, r) => {
      if (err) {
        res.send('following error')
      }else{
        res.send('following!!',r)
      }
    })
  });

});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send("email password required !!");
  }

  Users.findOne({ email: email }).then(savedUser => {
    if (!savedUser) {
      return res.status(422).send({ error: "invalid email or password" })
    }
    bcrypt.compare(password, savedUser.password).then(doMatch => {
      if (doMatch) {
        //res.send('successfull !!!')
        const fetchId = Users.findOne({email:savedUser.email});
        const token = jwt.sign({userId:fetchId.userId},JWT_SECRET)
         res.send({token:token})
      } else {
        return res.status(422).send({ error: "invalid email or password" })
      }
    })
  })
})

app.delete('/users/:username/follow', (req, res) => {
  res.send('Hello World!')
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})