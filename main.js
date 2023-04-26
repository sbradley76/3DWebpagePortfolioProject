import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//Scene
//Camera
//Renderer

const scene = new THREE.Scene(); //Scene

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // Camera

//#region Renderer
const renderer = new THREE.WebGLRenderer({ 
  canvas: document.querySelector('#bg'),});

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  //#endregion

  camera.position.setZ(20);

  //#region TaurusShape
  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
  const torus = new THREE.Mesh(geometry, material);
 // scene.add(torus);
//#endregion

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  const controls = new OrbitControls(camera, renderer.domElement);

  const moonTexture = new THREE.TextureLoader().load('8k_moon_texture.jpg');
  const moonTextureNormal = new THREE.TextureLoader().load('8k_moon_texture_normal.jpg');

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32), new THREE.MeshStandardMaterial({map: moonTexture, normalMap: moonTextureNormal})
  );
  scene.add(moon);
  moon.position.z = -30;
  moon.position.setX(-10);
  moon.position.setY(12)

  const earthTexture = new THREE.TextureLoader().load('Earth.jpg');
  const earthNormal = new THREE.TextureLoader().load('Earth_Normal.jpg');

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(7, 32, 32), new THREE.MeshStandardMaterial({map: earthTexture, normalMap: earthNormal})
  );
  scene.add(earth);
  earth.position.z = -28;
  earth.position.setX(12);
  earth.position.setY(11);

  Array(100).fill().forEach(addStar);

  const spaceTexture = new THREE.TextureLoader().load('Space.jpg');
  scene.background = spaceTexture;

  animate();

  function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    earth.rotation.x += 0.02;
    earth.rotation.y += 0.0125;
    earth.rotation.z += 0.02;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
  }
  document.body.onscroll = moveCamera;
  moveCamera();

  function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(75));
    star.position.set(x, y, z);
    scene.add(star);
  }

  function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;

    controls.update();

    renderer.render(scene, camera);
  }