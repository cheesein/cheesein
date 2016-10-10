module.exports = {

  init( router, config ) {

    router.get( '/', function( req, res ) {
      res.send( { 'hello': 'world' } );
    } );

  }

};