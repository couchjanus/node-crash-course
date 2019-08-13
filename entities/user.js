// entities/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define a schema
const userSchema = new Schema({
  username:  {
    type: String,
    required: true,
  },
  email: {
      type: String,
      required: true,
      unique:true
  },
  hash: String,
  salt: String,
  alive: Boolean,
  name: {
      first: String,
      last: String
  },
  age: Number,
  bio: String,
  avatar: Buffer,  
  twitter: {
    type: String,
    validate: {
        validator: function(text) {
            return text.indexOf('https://twitter.com/') === 0;
        },
        message: 'Twitter handle must start with https://twitter.com/'
    }
  },
  facebook: {
      type: String,
      validate: {
          validator: function(text) {
              return text.indexOf('https://www.facebook.com/') === 0;
          },
          message: 'Facebook must start with https://www.facebook.com/'
      }
  },
  linkedin: {
      type: String,
      validate: {
          validator: function(text) {
              return text.indexOf('https://www.linkedin.com/') === 0;
          },
          message: 'LinkedIn must start with https://www.linkedin.com/'
      }
  },
}, 
{
    timestamps: { createdAt: 'created_at', updatedAt: 'update_at' },
});

// userSchema.virtual('fullName').get(function () {
//     return this.name.first + ' ' + this.name.last;
// });

// Виртуальный мето fullName, который позволит вам задавать как имя, так и фамилию 

userSchema.virtual('fullName').
  get(function() { return this.name.first + ' ' + this.name.last; }).
  set(function(v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
});

// compile our model
const User = mongoose.model('User', userSchema);

module.exports = User;
