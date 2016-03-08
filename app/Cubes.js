"use strict";

var Cubes = function() {
  this.container;
  this.stats;
  this.camera;
  this.scene;
  this.raycaster;
  this.renderer;
  this.mouse = new THREE.Vector2();
  this.INTERSECTED;
  this.radius = 100;
  this.theta = 0;

};

Cubes.prototype.init = function() {
  this.container = document.createElement( 'div' );
  document.body.appendChild( this.container );

  this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

  this.scene = new THREE.Scene();

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 1, 1, 1 ).normalize();
  this.scene.add( light );

  var geometry = new THREE.BoxGeometry( 20, 20, 20 );

  var colorPalette = new Array(0xfaebd7, 0xc69587, 0xc2564a, 0xc3abab, 0xffe6b3);

  for ( var i = 0; i < 2000; i ++ ) {

    var colorIndex = Math.round(Math.random() * colorPalette.length);
    //Math.random() * 0xffffff
    var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: colorPalette[colorIndex] } ) );

    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;

    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;

    object.scale.x = Math.random() + 0.5;
    object.scale.y = Math.random() + 0.5;
    object.scale.z = Math.random() + 0.5;

    this.scene.add( object );
  }

  this.raycaster = new THREE.Raycaster();

  this.renderer = new THREE.WebGLRenderer();
  this.renderer.setClearColor( 0xf0f0f0 );
  this.renderer.setPixelRatio( window.devicePixelRatio );
  this.renderer.setSize( window.innerWidth, window.innerHeight );
  this.renderer.sortObjects = false;
  this.container.appendChild(this.renderer.domElement);


  var cubes = this;
  var animate = function () {
		requestAnimationFrame( animate );
    cubes.render();
    //this.stats.update();
	};
  animate();

  /*
  this.stats = new Stats();
  this.stats.domElement.style.position = 'absolute';
  this.stats.domElement.style.top = '0px';
  this.container.appendChild( this.stats.domElement );
  */

  //document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  //window.addEventListener( 'resize', onWindowResize, false );

}

Cubes.prototype.render = function() {
  this.theta += 0.1;

  this.camera.position.x = this.radius * Math.sin( THREE.Math.degToRad( this.theta ) );
  this.camera.position.y = this.radius * Math.sin( THREE.Math.degToRad( this.theta ) );
  this.camera.position.z = this.radius * Math.cos( THREE.Math.degToRad( this.theta ) );
  this.camera.lookAt( this.scene.position );

  this.camera.updateMatrixWorld();

  // find intersections

  this.raycaster.setFromCamera( this.mouse, this.camera );

  var intersects = this.raycaster.intersectObjects( this.scene.children );

  if ( intersects.length > 0 ) {

    if ( this.INTERSECTED != intersects[ 0 ].object ) {

      if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );

      this.INTERSECTED = intersects[ 0 ].object;
      this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
      this.INTERSECTED.material.emissive.setHex( 0xff0000 );

    }

  } else {

    if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );

    this.INTERSECTED = null;

  }

  this.renderer.render( this.scene, this.camera );
}

// @todo
/*
function onWindowResize() {

  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();

  this.renderer.setSize( window.innerWidth, window.innerHeight );
};

function onDocumentMouseMove( event ) {

  event.preventDefault();

  this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

};
*/

module.exports = Cubes;
