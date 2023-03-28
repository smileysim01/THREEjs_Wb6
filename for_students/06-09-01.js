// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";
import { setupBasicScene } from "./06-09-01-helpers.js";

// students can use the object loader
// uncomment this if necessary
// import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

/** Setup the window */
/** @type{number} */
let wid = 670; // window.innerWidth;
/** @type{number} */
let ht = 500; // window.innerHeight;
/** @type{T.WebGLRenderer} */
let renderer = new T.WebGLRenderer();
renderer.setSize(wid, ht);
renderer.shadowMap.enabled = true;

document.getElementById("museum_area").appendChild(renderer.domElement);

/* setupBasicScene creates a scene and puts the pedestals in place */
/** @type{T.Scene} */
let scene = setupBasicScene();

// Here, we add a basic, simple first object to the museum.
/**@type{T.Material} */
let material = new T.MeshPhongMaterial({
  color: "#00aa00",
  shininess: 15,
  specular: "#00ff00",
});
/**@type{T.BufferGeometry} */
let geometry = new T.BoxGeometry(0.5, 0.5, 0.5);
/**@type{T.Mesh} */
let cube = new T.Mesh(geometry, material);
cube.position.set(2, 1.35, 2);
cube.rotation.set(Math.PI / 4, 0, Math.PI / 4);
cube.castShadow = true;

// TODO: You need to create three more objects, and place them on pedestals.
//material2
let knot_material = new T.MeshPhongMaterial( { color: "#5eb0ed", specular:"#00ff00"} );
let knot = new T.Mesh(new T.TorusKnotGeometry(3,0.4,64,8,4,7), knot_material);
knot.scale.set(0.08,0.08,0.08);
knot.position.set(-2,1.45,2);
knot.castShadow = true
scene.add(knot);

//material3
let wired = new T.MeshPhongMaterial( { color: "red", shininess:10, wireframe:true} );
let tetra = new T.Mesh(new T.TetrahedronGeometry(1,0), wired);
tetra.scale.set(0.5,0.5,0.5);
tetra.position.set(-2,1.45,-2);
tetra.castShadow = true;
scene.add(tetra);

let tetra1 = new T.Mesh(new T.TetrahedronGeometry(1,0), wired);
tetra1.scale.set(0.45,0.45,0.45);
tetra1.position.set(-2,1.45,-2);
tetra1.castShadow = true;
scene.add(tetra1);

let tetra_material = new T.MeshPhongMaterial( { color: "orange", shininess:10} );
let tetra2 = new T.Mesh(new T.TetrahedronGeometry(1,0), tetra_material);
tetra2.scale.set(0.4,0.4,0.4);
tetra2.position.set(-2,1.45,-2);
tetra2.castShadow = true;
scene.add(tetra2);

//material4
let torus_material = new T.MeshPhongMaterial( { color: "#fe46b2", specular:"#650b0b"} );
let torus = new T.Mesh(new T.TorusGeometry(10,3,7,11,6.3), torus_material);
torus.scale.set(0.04,0.04,0.04);
torus.position.set(2,1.65,-2);
torus.castShadow = true;
scene.add(torus);

let dodecahedron = new T.Mesh(new T.DodecahedronGeometry(5,0), torus_material);
dodecahedron.scale.set(0.03,0.03,0.03);
dodecahedron.position.set(2,1.65,-2);
dodecahedron.castShadow = true;
scene.add(dodecahedron);


/* put a spotlight on the first object */
/**@type{T.SpotLight} */
let spotlight_1 = new T.SpotLight(0xaaaaff, 0.5);
spotlight_1.angle = Math.PI / 16;
spotlight_1.position.set(2, 5, 2);
spotlight_1.target = cube;
spotlight_1.castShadow = true;
scene.add(spotlight_1);

// TODO: You need to place the lights.
let spotlight_2 = new T.SpotLight(0xaaaaff, 0.5);
spotlight_2.angle = Math.PI / 16;
spotlight_2.position.set(-2, 5, 2);
spotlight_2.target = knot;
spotlight_2.castShadow = true;
scene.add(spotlight_2);

let spotlight_3 = new T.SpotLight(0xaaaaff, 0.5);
spotlight_3.angle = Math.PI / 16;
spotlight_3.position.set(-2, 5, -2);
spotlight_3.target = tetra;
spotlight_3.castShadow = true;
scene.add(spotlight_3);

let spotlight_4 = new T.SpotLight(0xaaaaff, 0.5);
spotlight_4.angle = Math.PI / 16;
spotlight_4.position.set(2, 5, -2);
spotlight_4.target = torus;
spotlight_4.castShadow = true;
scene.add(spotlight_4);

/** create a "main camera" */
/** @type{T.PerspectiveCamera} */
let main_camera = new T.PerspectiveCamera(60, wid / ht, 1, 100);
main_camera.position.set(0, 4, 6);
main_camera.rotation.set(-0.5, 0, 0);

/** this will be the "current camera" - we will switch when a button is pressed */
let active_camera = main_camera;

// TODO: You need to place these cameras.
let camera_1 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
camera_1.position.set(4,2,2);
camera_1.lookAt(cube.position);

let camera_2 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
camera_2.position.set(-4,2,2);
camera_2.lookAt(knot.position);

let camera_3 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
camera_3.position.set(-4,2,-2);
camera_3.lookAt(tetra.position);

let camera_4 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
camera_4.position.set(4,2,-2);
camera_4.lookAt(torus.position);

scene.add(cube);

// add orbit controls - but only to the main camera
let controls = new OrbitControls(main_camera, renderer.domElement);

/** Tie the buttons to the cameras */
function setupCamButton(name, camera) {
  const button = document.getElementById(name);
  if (!(button instanceof HTMLButtonElement))
    throw new Error(`Button ${name} doesn't exist`);
  button.onclick = function () {
    active_camera = camera;
    renderer.render(scene, active_camera);
  };
}
setupCamButton("main_cam", main_camera);
setupCamButton("cam_1", camera_1);
setupCamButton("cam_2", camera_2);
setupCamButton("cam_3", camera_3);
setupCamButton("cam_4", camera_4);

// finally, draw the scene. Also, add animation.
renderer.render(scene, active_camera);

let lastTimestamp; // undefined to start

// function bounce(step){
//   //extra articulated motion
//   let time = 0;
//   time += step / 4000; // time in seconds
//   // set the y position based on the time
//   let t = time % 1; // where are we in the cycle?
//   if (t < 0.1 || t > 0.9) {
//     dodecahedron.position.y = 1.65;
//     torus.position.y = 1.65;
//   }
//   else  {
//     dodecahedron.position.y = 1.65 + 10 * (0.16 - (0.5 - t) * (0.5 - t));
//     torus.position.y = 1.65 + 10 * (0.16 - (0.5 - t) * (0.5 - t));
//   }
// }
let f = 0;
function animate(timestamp) {
  // Convert time change from milliseconds to seconds
  let timeDelta = 0.001 * (lastTimestamp ? timestamp - lastTimestamp : 0);
  lastTimestamp = timestamp;

  // Animate the cube (basic object)
  cube.rotateOnWorldAxis(new T.Vector3(0, 1, 0), timeDelta);

  // TODO: animate your objects
  knot.rotateOnWorldAxis(new T.Vector3(0, 1, 0), timeDelta);
  tetra.rotateOnWorldAxis(new T.Vector3(0, 1, 0), timeDelta);
  tetra1.rotateOnWorldAxis(new T.Vector3(0, 1, 0), timeDelta);
  tetra2.rotateOnWorldAxis(new T.Vector3(0, 1, 0), timeDelta);
  torus.rotateOnWorldAxis(new T.Vector3(0, 1, 0), timeDelta);
  dodecahedron.rotateOnWorldAxis(new T.Vector3(0, 1, 0), timeDelta);

  if(dodecahedron.position.y <= 2.5 && f == 0){
    dodecahedron.position.y += 0.03;
    torus.position.y += 0.03;
  }
  else{
    if(dodecahedron.position.y <= 1.65)  f = 0;
    else{
      dodecahedron.position.y -= 0.03;
      torus.position.y -= 0.03;
      f = 1;
    }
  }

  // draw and loop
  renderer.render(scene, active_camera);
  window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);
