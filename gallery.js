import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene(); //Scene

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // Camera

//#region Renderer
const renderer = new THREE.WebGLRenderer({ 
  canvas: document.querySelector('#bg'),});

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  //#endregion

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  const bg = new THREE.TextureLoader().load('GalleryBackground.jpg');
  scene.background = bg;

  animate();

  function animate(){
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  }