"use strict";

var Visualizer = function() {
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  this.renderer = new THREE.WebGLRenderer();
  this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
  this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  this.cube = new THREE.Mesh( this.geometry, this.material );
};

Visualizer.prototype.init = function() {
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( this.renderer.domElement );
	this.scene.add( this.cube );
	this.camera.position.z = 5;

  var visualizer = this;
  var render = function () {
		requestAnimationFrame( render );

		visualizer.cube.rotation.x += 0.1;
		visualizer.cube.rotation.y += 0.1;

		visualizer.renderer.render(visualizer.scene, visualizer.camera);
	};
	render();
};

module.exports = Visualizer;
