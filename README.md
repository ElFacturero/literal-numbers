Literal-Numbers
========

Converts a decimal number into a literal representation of it.
Only Spanish Language support for now.

## How To

#### Browser

Call it with a number and will retrieve a literal representation:

```javascript
literalNumbers(2548);
// dos mil quinientos cuarenta y ocho
```

### Options

```javascript
{
  decimals: Boolean // convert decimals too [ default: false ]
  decBase: Number // Division for decimals [ defaults: 100 ] (2 decimals)
  decLiteral: Boolean, // Decimals literal if true, XX/100 if false [ defauls: false ]
  currency: { // in case the conversion if for a currency 
    singular: String, // Singular of the currency
    plural: String // Plural of the currency
  }
}
```

#### Examples

```javascript
literalNumbers(2548.28, { 
  decimals: true,
  decLiteral: true
});

// dos mil quinientos cuarenta y ocho con veintiocho
```


```javascript
literalNumbers(2548.28, { 
  decimals: true,
  decBase: 100
});

// dos mil quinientos cuarenta y ocho con 28/100
```

```javascript
literalNumbers(2548.28, { 
  decimals: true,
  decBase: 1000
});

// dos mil quinientos cuarenta y ocho con 280/1000
```

```javascript
literalNumbers(10548311.28, { 
  decimals: true,
  decBase: 100,
  currency: {
    singular: "PESO",
    plural: "PESOS"
});

// diez millones quinientos cuarenta y ocho mil trescientos once PESOS con 28/100
```


