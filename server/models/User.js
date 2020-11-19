
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const newLocal = this.notify;
const userSchema = new Schema({
  username: {
    type: String,
    minlength: 4,
    maxlength: 32
  },
  email: {
    type: String,
    minlength: 4,
    maxlength: 32,
    lowercase: true,
    unique: true,
    required: 'Email is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 32,
    required: 'password is required'
  },
  passwordConfirmation: {
    type: String,
    minlength: 4,
    maxlength: 32
  }
});

userSchema.pre('save', function (next) {
  const user = this
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return res.status(422).json({
        'error': 'There is an error while gensalt hash'
      })
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return res.status(422).json({
          'error': 'There is an error while password hash'
        })
      }
      user.password = hash
      next()
    })
  })
})

userSchema.methods.hasSamePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
