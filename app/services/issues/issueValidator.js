const joi = require('joi');

const schema = joi.object().keys(
    {
        title: joi.string().max(255).required()
            .label('Title')
            .error(() => 'Title is required and max length 255 chars'),

        description: joi.string().required()
            .label('Description')
            .error(() => 'Description is required'),

        status: joi.string().required().valid(['open', 'pending', 'closed'])
            .label('Status')
            .error(() => 'Status can be only open, pending or closed'),

        priority: joi.string().required().valid(['low', 'normal', 'high'])
            .label('Priority')
            .error(() => 'Priority can be only low, normal or high'),
    }
);

module.exports = data => joi.validate(data, schema);
