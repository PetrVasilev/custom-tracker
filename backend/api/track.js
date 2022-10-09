const express = require('express');
const Joi = require('joi');
const bodyParser = require('body-parser');

const validate = require('../middlewares/validate');
const Track = require('../models/Track');

const router = express.Router();

const bodySchema = Joi.object({
  events: Joi.array()
    .items(
      Joi.object({
        event: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).default([]),
        url: Joi.string().required(),
        title: Joi.string().required(),
        ts: Joi.date().required(),
      })
    )
    .required(),
});

const handler = async (req, res) => {
  const { events } = req.validatedData;

  Track.insertMany(events);

  return res.json({ message: 'success' });
};

router.post(
  '/',
  bodyParser.text({ type: '*/*' }),
  validate(bodySchema, { isPlainText: true }),
  handler
);

module.exports = router;
