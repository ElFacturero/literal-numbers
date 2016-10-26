(function(root, factory) {
  // Set up literalNumbers for each environment. 

  //AMD.
  if (typeof define === "function" && define.amd) {
    define(["exports"], function() {
      root.literalNumbers = factory(root);
    });

  //Node.js or CommonJS.
  } else if (typeof exports !== "undefined") {
    module.exports = factory();

  //As global.
  } else {
    global.literalNumbers = factory();
  }

}(this, function() {
  
  var units = [
      "cero"
    , "uno"
    , "dos"
    , "tres"
    , "cuatro"
    , "cinco"
    , "seis"
    , "siete"
    , "ocho"
    , "nueve"
  ];

  var tensUnit = [
      ""
    , "once"
    , "doce"
    , "trece"
    , "catorce"
    , "quince"
  ];

  var tensCompound = [ "", "dieci", "veinti" ];

  var tens = [
      ""
    , "diez"
    , "veinte"
    , "treinta"
    , "cuarenta"
    , "cincuenta"
    , "sesenta"
    , "setenta"
    , "ochenta"
    , "noventa"
  ];

  var hundredsCompound = [ "", "ciento" ];

  var hundreds = [
      ""
    , "cien"
    , "doscientos"
    , "trescientos"
    , "cuatrocientos"
    , "quinientos"
    , "seiscientos"
    , "setecientos"
    , "ochocientos"
    , "novecientos"
  ];

  var million = "millon";
  var millions = "millones";
  var thousand = "mil";
  var oneSeparator = "un";
  var andSeparator = "y";
  var widthSeparator = "con";

  var getTens = function(number){
    var tensNbo = Math.floor(number/10);
    var unitNbo = number - (tensNbo * 10);

    if (tensNbo === 0){
      return units[number];
    }

    if (unitNbo === 0){
      return tens[tensNbo];
    }

    if (tensNbo === 1){
      var full = tensUnit[unitNbo];
      if (full){
        return full;
      }
    }
    
    var compound = tensCompound[tensNbo];
    if (compound){
      return tensCompound[tensNbo] + units[unitNbo];
    }

    return tens[tensNbo] + " " + andSeparator + " " + units[unitNbo];
  };

  var getHundreds = function(number){
    var hundredsNbo = Math.floor(number / 100);
    var tensNbo = number - (hundredsNbo * 100);

    if (hundredsNbo === 0){
      return getTens(number);
    }

    if (tensNbo === 0){
      return hundreds[hundredsNbo];
    }

    var full = hundredsCompound[hundredsNbo];
    if (full){
      return full + " " + getTens(tensNbo);
    }

    return hundreds[hundredsNbo] + " " + getTens(tensNbo);
  };

  var getThousands = function(number){
    var thousandsNbo = Math.floor(number / 1000);
    var hundreadsNbo = number - (thousandsNbo * 1000);

    if (thousandsNbo === 0){
      return getHundreds(number);
    }

    if (thousandsNbo === 1 && hundreadsNbo === 0){
      return oneSeparator + " " + thousand;
    }

    var left = oneSeparator;
    if (thousandsNbo > 1 && thousandsNbo < 10){
      left = units[thousandsNbo];
    }
    else if (thousandsNbo >= 10){
      left = getHundreds(thousandsNbo);
      left = left.replace(units[1], oneSeparator);
    }

    if (hundreadsNbo === 0){
      return left + " " + thousand;
    }

    return left + " " + thousand + " " + getHundreds(hundreadsNbo);
  };

  var getMillions = function(number){
    var millionsNbo = Math.floor(number / 1000000);
    var thousandsNbo = number - (millionsNbo * 1000000);

    if (millionsNbo === 0){
      return getThousands(number);
    }

    var left = getThousands(millionsNbo);
    left = left.replace(units[1], oneSeparator);
    left += " " + (millionsNbo > 1 ? millions : million);

    if (thousandsNbo > 0){
      var thousandsAux = getThousands(thousandsNbo);
      
      thousandsAux = thousandsAux.replace("un mil", "mil");
      thousandsAux = thousandsAux.replace("ciento mil", "ciento un mil");

      left += " " + thousandsAux;
    }

    return left;
  };

  var getLiteral = function(number){
    return getMillions(number);
  };

  var convertFromNumber = function(number, options){
    var defaults = {
      decimals: false,
      decBase: 100,
      decLiteral: false,
      currency: null
    };

    if (!options){
      options = defaults;
    }

    options = {
      decimals: options.decimals,
      decBase: options.decBase,
      decLiteral: options.decLiteral,
      currency: options.currency
    };

    if (options.currency){
      options.currency = {
        singular: options.currency.singular,
        plural: options.currency.plural
      };
    }

    var left = Math.floor(number);
    var right = "";

    if (options.decimals){
      var sep = " " + widthSeparator + " ";
      right = ((Math.round(number * options.decBase)) - (left * options.decBase));

      if (options.decLiteral){
        right = sep + getLiteral(Math.floor(right));
      }
      else {
        right = sep + right + "/" + options.decBase; 
      }
    }

    if (left === 1 && options.currency){
      left = oneSeparator + " " + options.currency.singular;
    }
    else {
      var currency = "";
      if (options.currency) {
        currency = " " + (left === 1 ? options.currency.singular : options.currency.plural);
      }

      left = getLiteral(left) + currency;
    }

    return left + right;
  };


  var literalNumbers = function(number, options) {
    if (number === undefined || number === null) {
      return units[0];
    }

    return convertFromNumber(number, options);
  };

  return literalNumbers;

}));

