const User = require('../models/User')
const Budget = require('../models/User')
const env = require('../DB')
const jwt = require('jsonwebtoken')
const { CompileShallowModuleMetadata } = require('@angular/compiler')
const { updateLanguageServiceSourceFile, updateTaggedTemplate } = require('typescript')

  var UID = null
// User signup
exports.signup = function (req, res) {
  const { username, email, password, passwordConfirmation } = req.body
  if (!email || !password) {
    return res.status(422).json({ 'error': 'Please provide email or password' })
  }

  if (password != passwordConfirmation) {
    return res.status(422).json({ 'error': 'Password does not match' })
  }
  User.findOne({ email }, function (err, existingUser) {
    if (err) {
      return res.status(422).json({ 'error': 'Error! Minimum of 4 and Maximum of 32 Characters Required in all Fields!' })
    }
    if (existingUser) {
      return res.status(422).json({ 'error': 'User already exists' })
    }
    else {
      const user = new User({
        username, email, password

      })
      user.save(function (err) {
        if (err) {
          return res.status(422).json({
            'error': 'Error! Minimum of 4 and Maximum of 32 Characters Required in all Fields!'
          })
        }
        return res.status(200).json({ 'registered': true })
      })
    }
  })
 }

// User login
  exports.login = function (req, res) {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(422).json({ 'error': 'Please provide email or password' })
    }
    User.findOne({ email }, function (err, user) {
      if (err) {
        return res.status(422).json({
          'error': 'Oops! Something Went Wrong'
        })
      }

      if (!user) {
        return res.status(422).json({ 'error': 'Invalid user' })
      }

      if (user.hasSamePassword(password)) {
        json_token = jwt.sign(
          {
            userId: user.id,
            username: user.username
          },
          env.secret,
          { expiresIn: '1h' })

        return res.json(json_token)
      }
      else {
        return res.status(422).json({ 'error': 'Wrong email or password' })
      }
    })
  }

  exports.authMiddleware = function (req, res, next) {
    const json_token = req.headers.authorization
    try {
      if (json_token) {
        const user = parseToken(json_token)
        User.findById(user.userId, function (err, user) {
          if (err) {
            return res.status(422).json({
              'error': 'Oops! Something went wrong'
            })
          }
          if (user) {
            res.locals.user = user
            UID = user.id
            //console.log(UID)
            //console.log(res.locals.user)
            next()
          }
          else {
            return res.status(422).json({ 'error': 'Not authorized user' })
          }
        })
      }
      else {
        return res.status(422).json({ 'error': 'Not authorized user' })
      }
    } catch (err) {
      res.status(403).json({
        success: false,
        message: err
      })
    }
  }


  function parseToken(token) {
    return jwt.verify(token.split(' ')[1], env.secret)
  }

  exports.addBudget = function (req, res) {
    var {  title, budgetVal, color } = req.body
    color += "7f"
    if ( !title && !budgetVal && !color ) {

      return res.status(422).json({ 'error': 'Please provide title, budget, and color' })
    }

    // Budget.findOne({ title }, function (err, existingBudget) {
    //   if (err) {
    //     return res.status(422).json({ 'error': 'Oops! Something Went Wrong.' })
    //   }
    //   if (existingBudget) {
    //     return res.status(422).json({ 'error': 'Error! A Budget Already Exists With This Title.' })
    //   }
    //   else {
        console.log(UID)
        const user1 = UID

        User.findByIdAndUpdate(
          user1,
          {$push: {"budgets": { title, budgetVal,  color}}},
          {safe: true, new : true},
          function(err, user){
            if(err){
            console.log(err)
            }


          }
      );

        // budget.save(function (err) {
        //   if (err) {
        //     return res.status(422).json({

        //       'error': 'Oops! Something Went Wrong.'
        //     })
        //   }
        //   return res.status(200).json({ 'added': true })
        // })
      }
    //})
   //}

  //  exports.getBudget = function (req, res) {
  //    Budget.find({}).then((data) => {
  //     res.json({data});
  //    });



   exports.getBudget = function (req, res) {
     User.findById(UID, function(err, user) {
      if(err){
        console.log(err);
      } else {
        console.log(user.budgets)
        data = user.budgets
        res.json({data})
      }
     })
   }







