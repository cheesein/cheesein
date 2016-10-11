'use strict';

(function() {
  const path = require( 'path' );
  const fullConfig = require( path.join( __dirname, '../config.js' ) );

  let stage = 'development';
  if ( process.env.PRODUCTION ) {
    stage = 'production';
  }
  else if ( process.env.TEST ) {
    stage = 'test';
  }

  if ( !fullConfig[ stage ] ) {
    throw new Error( `Environment stage ${stage} not found in config.js` );
  }

  module.exports = fullConfig[ stage ];
})();