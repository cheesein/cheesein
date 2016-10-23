'use strict';

let fs = require( 'fs' );
let path = require( 'path' );
let Log = require( 'Log' );

module.exports = {
  routes: {},

  convertParams: function( params ) {
    let throwError = function( paramKey, requiredType ) {
      throw new Error( `Bad request, ${paramKey} needs to be of type ${requiredType}!` );
    };

    let newParams = {};

    for ( let key in params ) {
      let newVal;
      let newKey = key;

      if ( key.indexOf( 'int_' ) === 0 ) {
        if ( params[ key ].indexOf( '.' ) >= 0 ) {
          throwError( key, 'int' );
        }

        newVal = parseInt( params[ key ] );
        if ( newVal !== 0 && !newVal ) {
          throwError( key, 'int' );
        }
        newKey = key.substr( 4 );
      }
      else if ( key.indexOf( 'float_' ) === 0 ) {
        newVal = parseFloat( params[ key ] );
        if ( newVal !== 0 && !newVal ) {
          throwError( key, 'float' );
        }
        newKey = key.substr( 6 );
      }
      else {
        newVal = params[ key ];
      }

      newParams[ newKey ] = newVal;
    }

    return newParams;
  },

  routerHelper: function( component, componentFile, app, self ) {
    let wrapCallback = function( callback ) {
      return function( req, res ) {
        try {
          req.params = self.convertParams( req.params, res );
          callback( req, res );
        } catch ( err ) {
          res.send( err.toString() );
        }
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

    let componentsDir = path.join( __dirname + '/../components/' );
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