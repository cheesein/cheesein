'use strict';

const path = require( 'path' );
const ChildModel = require( path.join( __dirname, 'ChildModel' ) );

module.exports = {

  init( router, config ) {
    router.get( '/:int_id', function( req, res ) {
      let child = ChildModel.get( req.params.id );
      res.send( child );
    } );

    router.put( '/:int_id', function( req, res ) {
      let newChild = ChildModel.create( req.body );
      res.send( newChild );
    } );

    router.delete( '/:int_id', function( req, res ) {
      res.send( { 'access': false } );
    } );

  }

};