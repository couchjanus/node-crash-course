const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({

    title:  { type: String, required: true },
    content: { type: String, required: true},
    published_at: { type: Date, default: Date.now },
    },
    {
        timestamps: true
        // timestamps: { createdAt: 'created_at', updatedAt: 'update_at' },
    }
);
 

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
