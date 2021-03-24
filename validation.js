const Joi = require("joi");

const authValidation = (body) => {
	const validationSchema = Joi.object({
		username: Joi.string().alphanum().min(3).max(30).required(),
		password: Joi.string()
			.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
			.required(),
	});
	return validationSchema.validate(body);
};

module.exports = {
	authValidation,
};
