'use strict';

const arithmeticService = require('../services/arithmetic');

class ArithmeticController {
  // PUBLIC_INTERFACE
  add(req, res, next) {
    /** Express handler for POST /add. */
    try {
      const result = arithmeticService.add(req.body);
      return res.status(200).json({ result });
    } catch (err) {
      return next(err);
    }
  }

  // PUBLIC_INTERFACE
  subtract(req, res, next) {
    /** Express handler for POST /subtract. */
    try {
      const result = arithmeticService.subtract(req.body);
      return res.status(200).json({ result });
    } catch (err) {
      return next(err);
    }
  }

  // PUBLIC_INTERFACE
  multiply(req, res, next) {
    /** Express handler for POST /multiply. */
    try {
      const result = arithmeticService.multiply(req.body);
      return res.status(200).json({ result });
    } catch (err) {
      return next(err);
    }
  }

  // PUBLIC_INTERFACE
  divide(req, res, next) {
    /** Express handler for POST /divide. */
    try {
      const result = arithmeticService.divide(req.body);
      return res.status(200).json({ result });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new ArithmeticController();
