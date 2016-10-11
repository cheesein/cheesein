module.exports = {

  init( router, config ) {

    router.get( '/', function( req, res ) {
      res.send( { 'hello': 'world' } );
    } );

    router.delete( '/:id', function( req, res ) {
      res.send( { 'access': false } );
    } );

  }

};