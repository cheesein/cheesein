// eslint-disable-line global-require

'use strict';

let fs = require( 'fs' );
let path = require( 'path' );
let Log = require( 'Log' );

module.exports = {
  routes: {},

  throwTypeError: function( paramKey, requiredType ) {
    throw new Error( `Bad request, ${paramKey} needs to be of type ${requiredType}!` );
  },

  convertIntParam: function( param, key ) {
    if ( param.indexOf( '.' ) >= 0 ) {
      this.throwTypeError( key, 'int' );
    }

    let newVal = parseInt( param, 10 );
    if ( newVal !== 0 && !newVal ) {
      this.throwTypeError( key, 'int' );
    }
    return [newVal, key.substr( 4 ) ];
  },

  convertFloatParam: function( param, key ) {
    let newVal = parseFloat( param );
    if ( newVal !== 0 && !newVal ) {
      this.throwTypeError( key, 'float' );
    }
    return [ newVal, key.substr( 6 ) ];
  },

  convertSingleParam: function( param, key ) {
    if ( key.indexOf( 'int_' ) === 0 ) {
      return this.convertIntParam( param, key );
    }
    else if ( key.indexOf( 'float_' ) === 0 ) {
      return this.convertFloatParam( param, key );
    }

    return [ param, key ];
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

  parseBody: function( req ) {
    return new Promise( ( resolve, reject ) => {
      req.body = {};
      let timeout = setTimeout( function() {
        console.error( 'Body parsing timeout' );
        resolve();
      }, 10000 );
      let dataReceived = [];

      req.on( 'data', function( data ) {
        dataReceived.push( data );
      } );

      req.on( 'end', function() {
        let data = Buffer.concat( dataReceived ).toString();
        let body = {};
        try {
          body = JSON.parse( data );
          req.bodyType = 'json';
        } catch ( e ) {
          req.bodyType = 'text';
        }
        req.body = body;

        clearTimeout( timeout );
        resolve();
      } );
    } );
  },

  routerHelper: function( component, componentFile, app, self ) {
    let wrapCallback = function( callback ) {
      return function( req, res ) {
        self.parseBody( req ).then( () => {
          try {
            req.params = self.convertParams( req.params, res );
            return callback( req, res );
          } catch ( err ) {
            res.send( err.toString() );
          }
        } );
      }
    };

    let shortComponentFile = componentFile.substr( path.join( __dirname, '..' ).length )
      .replace( /\\/g, '/' );
    let prefix = `/api/${component.toLowerCase()}`;

    return {
      get( url, callback ) {
        self.routes[ 'GET::' + prefix + url ] = {
          component,
          file: shortComponentFile,
          url: prefix + url,
          method: 'GET',
        };
        return app.get( prefix + url, wrapCallback( callback ) );
      },

      post( url, callback ) {
        self.routes[ 'POST::' + prefix + url ] = {
          component,
          file: shortComponentFile,
          url: prefix + url,
          method: 'POST',
        };
        return app.post( prefix + url, wrapCallback( callback ) );
      },

      put( url, callback ) {
        self.routes[ 'PUT::' + prefix + url ] = {
          component,
          file: shortComponentFile,
          url: prefix + url,
          method: 'PUT',
        };
        return app.put( prefix + url, wrapCallback( callback ) );
      },

      delete( url, callback ) {
        self.routes[ 'DELETE::' + prefix + url ] = {
          component,
          file: shortComponentFile,
          url: prefix + url,
          method: 'DELETE',
        };
        return app.delete( prefix + url, wrapCallback( callback ) );
      }
    };
  },

  loadComponent: function( component, componentFile, app, config ) {
    let componentObj = require( componentFile );

    if ( !componentObj.init ) {
      throw `Unable to initialize component ${component}!`;
    }

    let router = this.routerHelper( component, componentFile, app, this );
    componentObj.init( router, config, app );
    Log.info( `Component '${component}' loaded` );
  },

  init: function( app, config ) {

    let componentsDir = path.join( __dirname, '/../components/' );
    let components = fs.readdirSync( componentsDir );
    components.forEach( ( component ) => {
      let componentFile = componentsDir + component + '/' + component + '.js';
      let componentStat = false;

      try {
        componentStat = fs.statSync( componentFile );

        if ( componentStat.isFile() ) {
          this.loadComponent( component, componentFile, app, config );
        }
      }
      catch ( e ) {
        Log.error( `Loading component ${component} failed!` );
        Log.error( ( e && e.stack ) ? e.stack : e );
      }
    } );

  }

};