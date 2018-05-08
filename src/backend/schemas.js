import Joi from 'joi';

export const registerUserRequestSchema = Joi.object().keys({
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().required(),
        username: Joi.string().required()
    })
});

export const verifyUserRequestSchema = Joi.object().keys({
    body: Joi.object().keys({
        code: Joi.string().required(),
        userRegistrationToken: Joi.string().required()
    })
});

export const authenticateRequestSchema = Joi.object().keys({
    body: Joi.object().keys({
        password: Joi.string().required(),
        username: Joi.string().required()
    })
});

export const putTodoRequestSchema = Joi.object().keys({
    body: Joi.object().keys({
        completed: Joi.bool().required(),
        id: Joi.string(),
        text: Joi.string().required(),
        userId: Joi.string()
    }),
    parameters: Joi.object().keys({
        authorization: Joi.string().required()
    })
});

export const getTodoRequestSchema = Joi.object().keys({
    parameters: Joi.object().keys({
        authorization: Joi.string().required(),
        id: Joi.string()
    })
});

export const deleteTodoRequestSchema = Joi.object().keys({
    parameters: Joi.object().keys({
        authorization: Joi.string().required(),
        id: Joi.string()
    })
});

export const fetchTodosRequestSchema = Joi.object().keys({
    parameters: Joi.object().keys({
        authorization: Joi.string().required()
    })
});
