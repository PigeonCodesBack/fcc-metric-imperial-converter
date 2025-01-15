const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

const lookup_tables = {

  'lowercase_units': {
    'gal': 'gal',
    'l': 'L',
    'lbs': 'lbs',
    'kg': 'kg',
    'mi': 'mi',
    'km': 'km'
  },

  'unit_spell': {
    'gal': 'gallons',
    'L': 'liters',
    'lbs': 'pounds',
    'kg': 'kilograms',
    'mi': 'miles',
    'km': 'kilometers'
  },

  'unit_conversion': {
    'gal': 'L',
    'L': 'gal',
    'lbs': 'kg',
    'kg': 'lbs',
    'mi': 'km',
    'km': 'mi'
  },

  'value_conversion': {
    'gal': galToL,
    'L': 1 / galToL,
    'lbs': lbsToKg,
    'kg': 1 / lbsToKg,
    'mi': miToKm,
    'km': 1 / miToKm
  }
}

function hasMultipleFractions(number) {
  return number.split('/').length > 2;
}


function ConvertHandler() {

  this.getNum = function (input) {
    const number_regex = /^[0-9.\/]+/;

    let match = input.match(number_regex);
    let number = match ? match[0] : '1';

    return hasMultipleFractions(number) ? 'invalid number' : parseFloat(eval(number));
  };

  this.getUnit = function (input) {
    const unit_regex = /[a-zA-Z]+$/;
    let match = input.match(unit_regex);
    let unit_lowercase = match[0].toLowerCase();
    return lookup_tables.lowercase_units[unit_lowercase] || 'invalid unit';
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    if (lookup_tables.unit_conversion.hasOwnProperty(initUnit)) {
      result = lookup_tables.unit_conversion[initUnit];
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    if (lookup_tables.unit_spell.hasOwnProperty(unit)) {
      result = lookup_tables.unit_spell[unit];
    } else {
      result = 'invalid unit';
    }

    return result
  };

  this.convert = function (initNum, initUnit) {
    
    let result;

    if (lookup_tables.value_conversion.hasOwnProperty(initUnit)) {
      result = initNum * lookup_tables.value_conversion[initUnit];
    } else {
      result = 'invalid unit';
    } 

    return isNaN(result) ? 'invalid number' : parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitSpell = this.spellOutUnit(initUnit);
    const returnUnitSpell = this.spellOutUnit(returnUnit);

    return `${initNum} ${initUnitSpell} converts to ${returnNum} ${returnUnitSpell}`;
  };

}

module.exports = ConvertHandler;
