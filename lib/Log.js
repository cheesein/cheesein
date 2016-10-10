'use strict';

let moment = require( 'moment' );
let colors = require( 'colors' );
module.exports = {
  stamp() {
    return moment().format( 'YYYY-MM-DD HH:mm:ss:SS' );
  },

  log( msg, prefix = '', color = 'cyan' ) {
    if ( typeof msg === 'object' ) {
      msg = JSON.stringify( msg, null, 2 );
    }

    if ( prefix ) {
      prefix = colors[ color ]( `[${prefix}]` );
    }
    console.log( this.stamp() + ` ${prefix} ${msg}` );
  },

  info( msg ) {
    this.log( msg, 'INFO', 'cyan' );
  },

  warn( msg ) {
    this.log( msg, 'WARN', 'yellow' );
  },

  error( msg ) {
    if ( typeof msg === 'object' ) {
      msg = JSON.stringify( msg, null, 2 );
    }

    console.error( this.stamp() + ' [ERROR] '.red + msg );
  },

  requestLogger() {
    let self = this;

    return function( req, res, next ) {
      self.log( `${req.method} ${req.url} ${req.ip}`, 'REQ' );
      next();
    }
  },
};