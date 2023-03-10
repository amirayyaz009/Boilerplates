export function createHandler(handler, schema) {
  return async (req, res) => {
    try {
      if (req.body && schema) {
        const { error } = schema.validate(req.body);
        if (error)
          return res.status(400).send({ error: error.details[0].message });
      }
      await handler(req, res);
    } catch ({ message }) {
      console.log(message);
      return res.status(500).send({ error: message });
    }
  };
}
