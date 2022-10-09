function formatError(joiError) {
  const errors = {};

  joiError.details.forEach((error) => {
    const key = error.path.join('.');
    errors[key] = errors[key] || [];
    errors[key].push(error.message);
  });

  return errors;
}

function validate(schema, { isPlainText = false }) {
  return async (req, res, next) => {
    const data = isPlainText
      ? JSON.parse(req.body)
      : {
          ...req.body,
          ...req.query,
        };
    const { value, error } = await schema.validate(data, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: {
        objects: true,
      },
    });

    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        errors: formatError(error),
      });
    }

    req.validatedData = value;
    return next();
  };
}

module.exports = validate;
