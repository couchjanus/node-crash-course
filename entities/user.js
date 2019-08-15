// entities/user.js
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const crypto = require('crypto');

const Schema = mongoose.Schema;


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
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  hash: String,
  salt: String,
  alive: Boolean,

  profile: {
    name: {
        first: String,
        last: String
    },
    gender: String,
    age: Number,
    bio: String,
    location: String,
    website: String,
    avatar: Buffer,  
    },

  tokens: Array,

  github: String,
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

userSchema.virtual('fullName').
  get(function() { return this.profile.name.first + ' ' + this.profile.name.last; }).
  set(function(v) {
    this.profile.name.first = v.substr(0, v.indexOf(' '));
    this.profile.name.last = v.substr(v.indexOf(' ') + 1);
});

/**
 * Password hash middleware.
 */

const saltRounds = 10;

userSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            // Store hash in your password DB.
            user.password = hash;
            next();
        });
    });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
 
/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://secure.gravatar.com/avatar/${md5}?s=${size}&d=retro`;
    // if(this.profile.avatar){
    //     return this.profile.avatar
    // }else{
    //     const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    //     return `https://secure.gravatar.com/avatar/${md5}?s=${size}&d=retro`;
    // }
};

// compile our model
const User = mongoose.model('User', userSchema);

module.exports = User;
