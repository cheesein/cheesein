'use strict';

const path = require( 'path' );
const ParticipantModel = require( path.join( __dirname, 'ParticipantModel' ) );

module.exports = {

  init( router, config, app ) {
    router.get( '/:int_id', function( req, res ) {
      let Participant = ParticipantModel.get( req.params.id );
      res.send( Participant );
    } );

    router.put( '/:int_id', function( req, res ) {
      let newParticipant = ParticipantModel.create( req.body );
      res.send( newParticipant );
    } );

    router.delete( '/:int_id', function( req, res ) {
      res.send( { 'access': false } );
    } );

  }

};
