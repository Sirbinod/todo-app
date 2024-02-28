import Joi from "joi";

const name = Joi.string();
const description = Joi.string();
const dateTime = Joi.date();
const status = Joi.string();

const TodoValidator = Joi.object({
  name: name.required(),
  description: description.required(),
  dateTime: dateTime.required(),
  status: status.optional(),
});

export { TodoValidator };
