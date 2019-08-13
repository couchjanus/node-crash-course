const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true, 
            unique:true, // должно быть уникальным
            validate: /\S+/,
        },
    },
);

categorySchema
  .virtual('url')
  .get( () => {
    return '/category/'+this._id;
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
