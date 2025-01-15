'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    if (!input) { return; }
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      res.json('invalid number and unit');
    } else if (initNum === 'invalid number') {
      res.json('invalid number');
    } else if (initUnit === 'invalid unit') {
      res.json('invalid unit');
    } else {
      return res.json({ initNum, initUnit, returnNum, returnUnit, string: toString });
    }
  });

};
