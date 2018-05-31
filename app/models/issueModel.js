const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const timestamps = require('mongoose-timestamp');

const IssueSchema = mongoose.Schema({
    title: {
        type: String,
        max: 255,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['open', 'pending', 'closed'],
        default: 'open',
    },
    priority: {
        type: String,
        enum: ['low', 'normal', 'high'],
        default: 'normal',
    }
}, {
    collection: 'issues',
});

IssueSchema.plugin(timestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

const Issue = mongoose.model('Issue', IssueSchema);

global.Issue = Issue;

module.exports = Issue;
