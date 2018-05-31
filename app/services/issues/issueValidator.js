const joi = require('joi');

const schema = joi.object().keys(
    {
        title: joi.string().max(255).required(),
        description: joi.string().required(),
        status: joi.string().required().valid(['open', 'pending', 'closed']),
        priority: joi.string().required().valid(['low', 'normal', 'high']),
    }
);

module.exports = data => joi.validate(data, schema);
