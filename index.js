'use strict';

const fs = require( 'fs' );
const path = require( 'path' );

const express = require( 'express' );
const colors = require( 'colors' );

let app = express();
let Router = require( 'Router' );

app.get( '/', function( req, res ) {
  fs.readFile( path.join( __dirname, 'static/front.html' ), function( err, data ) {
    if ( err ) {
      res.send( 'Error loading front file' );
    }

    let html = data.toString();
    html = html.replace( /\%routes\%/, JSON.stringify( Router.routes ).replace( '\'', '\\\'' ) );

    res.send( html );
  } );
} );

Router.init( app, {} );

app.listen( 3000, function() {
  console.log( `Listening on localhost:3000` );
} );