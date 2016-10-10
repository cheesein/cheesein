'use strict';

let fs = require( 'fs' );
let path = require( 'path' );
let Log = require( 'Log' );

module.exports = {
  routes: {},

  routerHelper: function( component, componentFile, app, self ) {
    let shortComponentFile = componentFile.substr( path.join( __dirname, '..' ).length );
    let prefix = `/api/${component.toLowerCase()}`;
    return {
      get( url, callback ) {
        self.routes[ 'GET.' + prefix + url ] = {
          component,
          file: shortComponentFile,
          url: prefix + url,
          method: 'GET',
        };
        return app.get( prefix + url, callback );
      },

      post( url, callback ) {
        return app.post( prefix + url, callback );
      },

      put( url, callback ) {
        return app.put( prefix + url, callback );
      },

      delete( url, callback ) {
        return app.delete( prefix + url, callback );
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