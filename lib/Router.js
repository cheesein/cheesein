// eslint-disable-line global-require

'use strict';

const fs = require( 'fs' );
const path = require( 'path' );
const Log = require( 'Log' );
const Utilities = require( 'Utilities' );

module.exports = {
  routes: {},

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
            req.params = Utilities.convertParams( req.params, res );
            return callback( req, res );
          } catch ( err ) {
            res.send( err.toString() );
          }
        } );
      };
    };

    let request = function( method, url, callback, component, shortComponentFile, prefix, self ) {
      let fullUrl = prefix + url;

      self.routes[ method + '::' + prefix + url ] = {
        component,
        file: shortComponentFile,
        url: fullUrl,
        method: method,
      };
      return app[ method.toLowerCase() ]( fullUrl, wrapCallback( callback ) );
    };

    let shortComponentFile = componentFile.substr( path.join( __dirname, '..' ).length )
      .replace( /\\/g, '/' );
    let prefix = `/api/${component.toLowerCase()}`;

    return {
      get( url, callback ) {
        return request( 'GET', url, callback, component, shortComponentFile, prefix, self );
      },

      post( url, callback ) {
        return request( 'POST', url, callback, component, shortComponentFile, prefix, self );
      },

      put( url, callback ) {
        return request( 'PUT', url, callback, component, shortComponentFile, prefix, self );
      },

      delete( url, callback ) {
        return request( 'DELETE', url, callback, component, shortComponentFile, prefix, self );
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
      catch ( err ) {
        Log.error( `Loading component ${component} failed!` );
        Log.error( ( err && err.stack ) ? err.stack : err );
      }
    } );
  }

};
