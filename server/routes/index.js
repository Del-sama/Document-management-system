import express from 'express';

const router = express.Router();

router.route('/')
  .get((request, response) => response
    .status(200)
    .send({ message: 'Document Management System' }));

module.exports = () => router;

