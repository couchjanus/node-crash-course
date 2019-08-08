// entities/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define a schema
const userSchema = new Schema({
  username: String,
  email: {
      type: String,
      required: true,
      
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
  image: String,
  
}, 
{
    timestamps: true
    // timestamps: { createdAt: 'created_at', updatedAt: 'update_at' },
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
