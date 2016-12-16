'use strict';

module.exports = {
  throwTypeError: function( paramKey, requiredType ) {
    throw new Error( `Bad request, ${paramKey} needs to be of type ${requiredType}!` );
  },

  convertIntParam: function( value, key ) {
    if ( value.indexOf( '.' ) >= 0 ) {
      this.throwTypeError( key, 'int' );
    }

    let newVal = parseInt( value, 10 );
    if ( newVal !== 0 && !newVal ) {
      this.throwTypeError( key, 'int' );
    }
    return [newVal, key.substr( 4 ) ];
  },

  convertFloatParam: function( value, key ) {
    let newVal = parseFloat( value );
    if ( newVal !== 0 && !newVal ) {
      this.throwTypeError( key, 'float' );
    }
    return [ newVal, key.substr( 6 ) ];
  },

  convertSingleParam: function( value, key ) {
    if ( key.indexOf( 'int_' ) === 0 ) {
      return this.convertIntParam( value, key );
    }
    else if ( key.indexOf( 'float_' ) === 0 ) {
      return this.convertFloatParam( value, key );
    }

    return [ value, key ];
  },

  convertParams: function( params ) {
    let newParams = {};

    for ( let key in params ) {
      if ( !params.hasOwnProperty( key ) ) {
        continue;
      }
      let result = this.convertSingleParam( params[ key ], key );
      newParams[ result[ 1 ] ] = result[ 0 ];
    }
    return newParams;
  },
};
