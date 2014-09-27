describe("Tests", function(){

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
    , "nueve"];

  var cents = [
      "cien"
    , "doscientos"
    , "trescientos"
    , "cuatrocientos"
    , "quinientos"
    , "seiscientos"
    , "setecientos"
    , "ochocientos"
    , "novecientos"];
  
  describe("#literalNumber", function(){
      
    it ("should be exists as a function", function(){
      expect(window.literalNumbers).to.be.a("function");
    });

    it ("should literal a null or undefined as 'cero'", function(){
      expect(window.literalNumbers()).to.be.equal("cero");
    });

    it ("should literal units", function(){
      var literal = window.literalNumbers;

      for (var i=0; i<=9; i++){
        expect(literal(i)).to.be.equal(units[i]);
      }

    });

    it ("should literal tens", function(){
      var literal = window.literalNumbers;

      var literals = [
          "diez"
        , "veinte"
        , "treinta"
        , "cuarenta"
        , "cincuenta"
        , "sesenta"
        , "setenta"
        , "ochenta"
        , "noventa"];

      for (var i=1; i<=9; i++){
        expect(literal(i*10)).to.be.equal(literals[i-1]);
      }
    });

    it ("should literal compound tens", function(){
      var literal = window.literalNumbers;

      var literals = [
          "once"
        , "doce"
        , "trece"
        , "catorce"
        , "quince"
        , "dieciseis"
        , "diecisiete"
        , "dieciocho"
        , "diecinueve"];

      for (var i=1; i<=9; i++){
        expect(literal(i+10)).to.be.equal(literals[i-1]);
      }

      var twenty = "veinti";

      for (var i=1; i<=9; i++){
        expect(literal(i+20)).to.be.equal(twenty + units[i]);
      }

      expect(literal(31)).to.be.equal("treinta y uno");
      expect(literal(42)).to.be.equal("cuarenta y dos");
      expect(literal(55)).to.be.equal("cincuenta y cinco");

    });

    it ("should literal hundreds", function(){
      var literal = window.literalNumbers;

      for (var i=1; i<=9; i++){
        expect(literal(i*100)).to.be.equal(cents[i-1]);
      }

    });

    it ("should literal hundreds with units", function(){
      var literal = window.literalNumbers;

      expect(literal(101)).to.be.equal("ciento uno");
      for (var i=2; i<=9; i++){
        expect(literal(i*100+i)).to.be.equal(cents[i-1] + " " + units[i]);
      }

    });

    it ("should literal compound hundreds", function(){
      var literal = window.literalNumbers;

      expect(literal(110)).to.be.equal("ciento diez");
      expect(literal(111)).to.be.equal("ciento once");
      expect(literal(116)).to.be.equal("ciento dieciseis");

      expect(literal(120)).to.be.equal("ciento veinte");
      expect(literal(121)).to.be.equal("ciento veintiuno");
      expect(literal(126)).to.be.equal("ciento veintiseis");

      expect(literal(140)).to.be.equal("ciento cuarenta");
      expect(literal(158)).to.be.equal("ciento cincuenta y ocho");
      expect(literal(165)).to.be.equal("ciento sesenta y cinco");

      expect(literal(280)).to.be.equal("doscientos ochenta");
      expect(literal(522)).to.be.equal("quinientos veintidos");
      expect(literal(637)).to.be.equal("seiscientos treinta y siete");
      expect(literal(811)).to.be.equal("ochocientos once");

    });

    it ("should literal thousands", function(){
      var literal = window.literalNumbers;

      expect(literal(1000)).to.be.equal("un mil");
      expect(literal(2000)).to.be.equal("dos mil");
      expect(literal(5000)).to.be.equal("cinco mil");

      expect(literal(11000)).to.be.equal("once mil");
      expect(literal(54000)).to.be.equal("cincuenta y cuatro mil");

      expect(literal(100001)).to.be.equal("cien mil uno"); 
      expect(literal(101000)).to.be.equal("ciento un mil");
      expect(literal(102000)).to.be.equal("ciento dos mil");
      expect(literal(112000)).to.be.equal("ciento doce mil");
      expect(literal(118000)).to.be.equal("ciento dieciocho mil");
      expect(literal(121000)).to.be.equal("ciento veintiun mil");

      expect(literal(141000)).to.be.equal("ciento cuarenta y un mil");
      expect(literal(132000)).to.be.equal("ciento treinta y dos mil");
      expect(literal(325000)).to.be.equal("trescientos veinticinco mil");
      expect(literal(646000)).to.be.equal("seiscientos cuarenta y seis mil");

      expect(literal(646001)).to.be.equal("seiscientos cuarenta y seis mil uno");
      expect(literal(646012)).to.be.equal("seiscientos cuarenta y seis mil doce");
      expect(literal(713342)).to.be.equal("setecientos trece mil trescientos cuarenta y dos");
      expect(literal(100053)).to.be.equal("cien mil cincuenta y tres");

    });

    it ("should literal millions", function(){
      var literal = window.literalNumbers;

      expect(literal(1000000)).to.be.equal("un millon");
      expect(literal(2000000)).to.be.equal("dos millones");
      expect(literal(5000000)).to.be.equal("cinco millones");

      expect(literal(11000000)).to.be.equal("once millones");
      expect(literal(54000000)).to.be.equal("cincuenta y cuatro millones");

      expect(literal(1100001)).to.be.equal("un millon cien mil uno"); 
      expect(literal(1101000)).to.be.equal("un millon ciento un mil");

      expect(literal(101000000001)).to.be.equal("ciento un mil millones uno"); 
      expect(literal(21001001)).to.be.equal("veintiun millones mil uno"); 

    });


    it ("should literal 2 decimals", function(){
      var literal = window.literalNumbers;
      var opts = {
        decimals: true,
        decBase: 100,
        decLiteral: true
      };

      expect(literal(1000.21, opts)).to.be.equal("un mil con veintiuno");
      expect(literal(123211.33, opts)).to.be.equal("ciento veintitres mil doscientos once con treinta y tres");
      
    });

    it ("should literal 3 decimals", function(){
      var literal = window.literalNumbers;
      var opts = {
        decimals: true,
        decBase: 1000,
        decLiteral: true
      };

      expect(literal(1000.211, opts)).to.be.equal("un mil con doscientos once");
      expect(literal(123211.335, opts)).to.be.equal("ciento veintitres mil doscientos once con trescientos treinta y cinco");
      
    });

    it ("should literal 2 decimals with cents", function(){
      var literal = window.literalNumbers;
      var opts = {
        decimals: true,
        decBase: 100,
        decLiteral: false
      };

      expect(literal(1000.21, opts)).to.be.equal("un mil con 21/100");
      expect(literal(123211.33, opts)).to.be.equal("ciento veintitres mil doscientos once con 33/100");
      
    });

    it ("should literal 3 decimals with cents", function(){
      var literal = window.literalNumbers;
      var opts = {
        decimals: true,
        decBase: 1000,
        decLiteral: false
      };

      expect(literal(1000.21, opts)).to.be.equal("un mil con 210/1000");
      expect(literal(123211.335, opts)).to.be.equal("ciento veintitres mil doscientos once con 335/1000");
      
    });

    it ("should allow to set a currency name", function(){
      var literal = window.literalNumbers;
      var opts = {
        decimals: true,
        decBase: 100,
        decLiteral: false,
        currency: {
          singular: "PESO",
          plural: "PESOS"
        }
      };

      expect(literal(1.5, opts)).to.be.equal("un PESO con 50/100");
      expect(literal(2234.25, opts)).to.be.equal("dos mil doscientos treinta y cuatro PESOS con 25/100");
      
    });

  });

});