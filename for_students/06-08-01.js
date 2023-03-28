// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { Color, Light } from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";


let renderer = new T.WebGLRenderer();
renderer.setSize(500, 500);
document.getElementById("div1").appendChild(renderer.domElement);

// student does the rest.
let scene = new T.Scene();
let camera = new T.PerspectiveCamera();
camera.position.z = 10;  //10;
camera.position.y = 0;  //5;
camera.position.x = 0;  //5;
camera.lookAt(0, 0, 0);
let controls = new OrbitControls(camera, renderer.domElement);
controls.update();

scene.background = new T.Color("#00ffff");

// make a ground plane
let groundBox = new T.BoxGeometry(6, 0.1, 6);
let groundMesh = new T.Mesh(
groundBox,
new T.MeshPhongMaterial({ color: "green" })
);
groundMesh.position.y = -1.05;
scene.add(groundMesh);

scene.add(new T.AmbientLight("white", 0.3));
let point = new T.PointLight("white", 1, 3, 0);
point.position.set(20, 10, 15);
scene.add(point);

let pt1 = new T.DirectionalLight("white", 0.2);
pt1.position.set(0,8,12);
let pt2 = new T.DirectionalLight("white", 0.2);
pt2.position.set(0,8,-12);
let pt3 = new T.DirectionalLight("white", 0.2);
pt3.position.set(8,8,0);
let pt4 = new T.DirectionalLight("white", 0.2);
pt4.position.set(-8,8,0);
scene.add(pt1);
scene.add(pt2);
scene.add(pt3);
scene.add(pt4);

let left_arm1, right_arm1;
function draw_snowman1(x,z){
    let snow = new T.MeshStandardMaterial({color:"white", roughness: 1});
    let eyes = new T.MeshStandardMaterial({color:"grey", metalness:1});
    let mouth_mat = new T.MeshStandardMaterial({color:"#DC143C"});
    let carrot = new T.MeshStandardMaterial({color:"#ff781f", roughness:1});
    let branch = new T.MeshStandardMaterial({color:"#CD7F32", roughness:1});

    let body_bottom = new T.Mesh(new T.SphereGeometry(1), snow);
    body_bottom.position.x = x;
    body_bottom.position.y = groundMesh.position.y + 0.5;
    body_bottom.position.z = z;
    body_bottom.scale.set(0.5,0.5,0.5);
    scene.add(body_bottom);

    let body_mid = new T.Mesh(new T.SphereGeometry(0.75), snow);
    body_mid.position.x = x;
    body_mid.position.y = body_bottom.position.y + 0.75;
    body_mid.position.z = z;
    body_mid.scale.set(0.5,0.5,0.5);
    scene.add(body_mid);

    let body_head = new T.Mesh(new T.SphereGeometry(0.5), snow);
    body_head.position.x = x;
    body_head.position.y = body_mid.position.y + 0.5;
    body_head.position.z = z;
    body_head.scale.set(0.5,0.5,0.5);
    scene.add(body_head);

    let left_eye = new T.Mesh(new T.SphereGeometry(0.1), eyes);
    left_eye.position.x = x - 0.1;
    left_eye.position.y = body_mid.position.y + 0.6;
    left_eye.position.z = z + 0.2;
    left_eye.scale.set(0.5,0.5,0.5);
    scene.add(left_eye);

    let right_eye = new T.Mesh(new T.SphereGeometry(0.1), eyes);
    right_eye.position.x = x + 0.1;
    right_eye.position.y = body_mid.position.y + 0.6;
    right_eye.position.z = z + 0.2;
    right_eye.scale.set(0.5,0.5,0.5);
    scene.add(right_eye);

    let nose = new T.Mesh(new T.ConeGeometry(0.1,0.5), carrot);
    nose.position.x = x;
    nose.position.y = body_mid.position.y + 0.5;
    nose.position.z = z + 0.3;
    nose.rotateX(Math.PI/2);
    nose.scale.set(0.5,0.5,0.5);
    scene.add(nose);

    let mouth = [];
    for(let i = -0.1; i<0.15; i = i + 0.05){
        mouth[i] = new T.Mesh(new T.SphereGeometry(0.05), mouth_mat);
        mouth[i].position.x = x + i;
        if(i == 0.1 || i== -0.1)    mouth[i].position.y = body_mid.position.y + 0.45;
        else    mouth[i].position.y = body_mid.position.y + 0.4;
        mouth[i].position.z = z + 0.22;
        mouth[i].scale.set(0.5,0.5,0.5);
        scene.add(mouth[i]);
    }

    left_arm1 = new T.Mesh(new T.CylinderGeometry(0.08,0.08,1.5),branch);
    left_arm1.position.x = x + 0.5;
    left_arm1.position.y = body_mid.position.y + 0.25;
    left_arm1.position.z = z;
    left_arm1.rotateZ(Math.PI/1.5);
    left_arm1.scale.set(0.5,0.5,0.5);
    scene.add(left_arm1);

    right_arm1 = new T.Mesh(new T.CylinderGeometry(0.08,0.08,1.5),branch);
    right_arm1.position.x = x - 0.5;
    right_arm1.position.y = body_mid.position.y + 0.25;
    right_arm1.position.z = z;
    right_arm1.rotateZ(-Math.PI/1.5);
    right_arm1.scale.set(0.5,0.5,0.5);
    scene.add(right_arm1);
}


let left_arm2, right_arm2;
function draw_snowman2(x,z){
    let snow = new T.MeshStandardMaterial({color:"white", roughness: 1});
    let eyes = new T.MeshStandardMaterial({color:"grey", metalness:1});
    let mouth_mat = new T.MeshStandardMaterial({color:"#DC143C"});
    let carrot = new T.MeshStandardMaterial({color:"#ff781f", roughness:1});
    let branch = new T.MeshStandardMaterial({color:"brown", roughness:1});
    let cloth = new T.MeshStandardMaterial({color:"#9e4aef", roughness:1, metalness: 1});

    let body_bottom = new T.Mesh(new T.SphereGeometry(1), snow);
    body_bottom.position.x = x;
    body_bottom.position.y = groundMesh.position.y + 0.75;
    body_bottom.position.z = z;
    body_bottom.scale.set(0.75,0.75,0.75);
    scene.add(body_bottom);

    let body_mid = new T.Mesh(new T.SphereGeometry(0.75), snow);
    body_mid.position.x = x;
    body_mid.position.y = body_bottom.position.y + 1;
    body_mid.position.z = z;
    body_mid.scale.set(0.75,0.75,0.75);
    scene.add(body_mid);

    let body_head = new T.Mesh(new T.SphereGeometry(0.5), snow);
    body_head.position.x = x;
    body_head.position.y = body_mid.position.y + 0.75;
    body_head.position.z = z;
    body_head.scale.set(0.75,0.75,0.75);
    scene.add(body_head);

    let left_eye = new T.Mesh(new T.SphereGeometry(0.1), eyes);
    left_eye.position.x = x - 0.2;
    left_eye.position.y = body_mid.position.y + 0.85;
    left_eye.position.z = z + 0.3;
    left_eye.scale.set(0.75,0.75,0.75);
    scene.add(left_eye);

    let right_eye = new T.Mesh(new T.SphereGeometry(0.1), eyes);
    right_eye.position.x = x + 0.2;
    right_eye.position.y = body_mid.position.y + 0.85;
    right_eye.position.z = z + 0.3;
    right_eye.scale.set(0.75,0.75,0.75);
    scene.add(right_eye);

    let nose = new T.Mesh(new T.ConeGeometry(0.1,0.5), carrot);
    nose.position.x = x;
    nose.position.y = body_mid.position.y + 0.7;
    nose.position.z = z + 0.5;
    nose.rotateX(Math.PI/2);
    nose.scale.set(0.75,0.75,0.75);
    scene.add(nose);

    let mouth = [];
    for(let i = -0.2; i<0.3; i = i + 0.1){
        mouth[i] = new T.Mesh(new T.SphereGeometry(0.05), mouth_mat);
        mouth[i].position.x = x + i;
        if(i == 0.2 || i== -0.2)    mouth[i].position.y = body_mid.position.y + 0.6;
        else    mouth[i].position.y = body_mid.position.y + 0.55;
        mouth[i].position.z = z + 0.3;
        mouth[i].scale.set(0.75,0.75,0.75);
        scene.add(mouth[i]);
    }

    left_arm2 = new T.Mesh(new T.CylinderGeometry(0.08,0.08,1.5),branch);
    left_arm2.position.x = x + 0.75;
    left_arm2.position.y = body_mid.position.y + 0.25;
    left_arm2.position.z = z;
    left_arm2.rotateZ(Math.PI/1.5);
    left_arm2.scale.set(0.75,0.75,0.75);
    scene.add(left_arm2);

    right_arm2 = new T.Mesh(new T.CylinderGeometry(0.08,0.08,1.5),branch);
    right_arm2.position.x = x - 0.75;
    right_arm2.position.y = body_mid.position.y + 0.25;
    right_arm2.position.z = z;
    right_arm2.rotateZ(-Math.PI/1.5);
    right_arm2.scale.set(0.75,0.75,0.75);
    scene.add(right_arm2);

    let hat_base = new T.Mesh(new T.CylinderGeometry(0.4,0.4,0.2),cloth);
    hat_base.position.x = x;
    hat_base.position.y = body_head.position.y + 0.35;
    hat_base.position.z = z;
    hat_base.scale.set(0.75,0.75,0.75);
    scene.add(hat_base);

    let hat = new T.Mesh(new T.CylinderGeometry(0.3,0.3,0.5),cloth);
    hat.position.x = x;
    hat.position.y = body_head.position.y + 0.55;
    hat.position.z = z;
    hat.scale.set(0.75,0.75,0.75);
    scene.add(hat);

    let buttons = [];
    for(let i = 0; i < 0.5; i+=0.2){
        buttons[i] = new T.Mesh(new T.SphereGeometry(0.08), cloth);
        buttons[i].position.x = x;
        buttons[i].position.y = body_mid.position.y + i;
        if(i>0.3)   buttons[i].position.z = z + 0.45;
        else    buttons[i].position.z = z + 0.58;
        buttons[i].scale.set(0.75,0.75,0.75);
        scene.add(buttons[i]);
    }
}

function draw_light(){
    let pole = new T.MeshStandardMaterial({color:"brown", roughness:1});
    let bulb = new T.MeshStandardMaterial({color:"#ffcf42", transparent:true, opacity:0.8});
    let stand = new T.Mesh(new T.CylinderGeometry(0.1,0.1,4),pole);
    stand.position.y = groundMesh.position.y + 2;
    scene.add(stand);

    let light = new T.Mesh(new T.CylinderGeometry(0.4,0.4,1),bulb);
    light.position.y = stand.position.y + 2.25;
    scene.add(light);

    let light_bulb = new T.Mesh(new T.SphereGeometry(0.2), new T.MeshStandardMaterial({color:"white"}));
    light_bulb.position.y = stand.position.y + 2.2;
    scene.add(light_bulb);

    let spot = new T.SpotLight("yellow", 0.5);
    spot.angle = Math.PI / 8;
    spot.position.y = light_bulb.position.y;
    spot.target = groundMesh;
    spot.castShadow = true;
    scene.add(spot);
}

let dir = 1;
let angle = 0;

function animate(){
    if(angle<=3*Math.PI/8 && angle>=Math.PI/4){
        if(dir==1){
            right_arm1.rotateZ(0.01);
            left_arm1.rotateZ(-0.01);
            right_arm2.rotateZ(-0.01);
            left_arm2.rotateZ(0.01);
            angle -= 0.01;
        }
        else{
            right_arm1.rotateZ(-0.01);
            left_arm1.rotateZ(0.01);
            right_arm2.rotateZ(0.01);
            left_arm2.rotateZ(-0.01);
            angle += 0.01;
        }
    }
    else if(angle < Math.PI/4){
        dir = 0;
        angle = Math.PI/4 + 0.01;
    }
    else if(angle > 3*Math.PI/8){
        dir = 1;
        angle = 3*Math.PI/8 - 0.01;
    }

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}
draw_snowman1(-1,-1);
draw_snowman2(2,1);
draw_light();
window.requestAnimationFrame(animate);

