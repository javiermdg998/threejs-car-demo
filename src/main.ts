// src/main.ts
import * as THREE from 'three';
import './style.css'
import { OBJLoader } from 'three/examples/jsm/Addons.js';
import CAR_URL from './models/car/car.obj?url'
import { showColorModal } from './components/modal';
import type { Animation } from './animations/abstractions/i-animation';

const loader = new OBJLoader();
loader.load(CAR_URL, function (obj) {
    obj.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshBasicMaterial({ color: 0xff77ff, wireframe: true });
        }
    })
    scene.add(obj)
    // animations.push(new WarningAnimation((obj)));
},
function (progress) {
    console.log(progress.total)
},
function (error) {
    console.error(error);

});



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);
const renderer = new THREE.WebGLRenderer();
document.getElementById("app")?.appendChild(renderer.domElement)
renderer.setSize(window.innerWidth, window.innerHeight, true);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

const animations : Animation[] = [];

function loop() {
    requestAnimationFrame(loop);
    animations.forEach(animation => animation.animate());

    scene.rotation.y += 0.01;
    renderer.render(scene, camera);
}
loop();




renderer.domElement.addEventListener('click', onClick, false);

async function onClick(event: MouseEvent) {
    
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);



    const intersects = raycaster.intersectObjects(scene.children, true); // true para recorrer hijos


    if (intersects.length > 0) {
        const objectSelected = intersects[0].object;
        const color = await showColorModal({scene, animations}, objectSelected);
        if(!color) return;
        console.log('Objeto clickeado:', objectSelected);
        (objectSelected as THREE.Mesh).material = new THREE.MeshBasicMaterial({ color: color });
    }
}