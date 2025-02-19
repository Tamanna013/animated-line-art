import * as three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const scene = new three.Scene();
const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new three.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); 
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

const lineCount = 30;
const lineSpacing = 0.1; 
const lines = [];
const colors = [
    0x00008B, // Dark Blue  
    0x0000CD, // Medium Blue  
    0x191970, // Midnight Blue  
    0x1E3A8A, // Deep Indigo Blue  
    0x2A52BE, // Cerulean Blue  
    0x4682B4, // Steel Blue  
    0x5D3FD3, // Royal Blue  
    0x4169E1, // Bright Royal Blue  
    0x0F52BA, // Sapphire Blue  
    0x27408B  // Dark Slate Blue  
];
  
  
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(new three.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0;
bloomPass.strength = 2;
bloomPass.radius = 0.1;
composer.addPass(bloomPass);

function createInfiniteLine(offset) {
    const points = [];
    for (let x = -50; x <= 50; x += 0.4) {
        let y = Math.sin(x * 1.5 + offset) * 2;
        let z = Math.cos(x * 1.2 + offset) * 1.5;
        points.push(new three.Vector3(x, y, z));
    }

    const curve = new three.CatmullRomCurve3(points);
    const geometry = new three.TubeGeometry(curve, 100, 0.02, 8, false);
    const material = new three.MeshStandardMaterial({ 
        color: colors[offset % colors.length], 
        emissive: colors[offset % colors.length],
        emissiveIntensity: 1.5, 
        roughness: 0.3, 
        metalness: 0.8 
    });

    const lineMesh = new three.Mesh(geometry, material);
    lineMesh.position.y = (offset - lineCount / 2) * lineSpacing;
    lines.push(lineMesh);
    scene.add(lineMesh);
}

for (let i = 0; i < lineCount; i++) {
    createInfiniteLine(i);
}

camera.position.set(0, 0, 10);

const light = new three.AmbientLight(0x404040);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const animate = function () {
    requestAnimationFrame(animate);
    controls.update();

    lines.forEach((line, index) => {
        const positions = line.geometry.attributes.position.array;
        for (let j = 0; j < positions.length; j += 3) {
            positions[j + 1] = Math.sin(positions[j] + performance.now() * 0.002 + index * 0.3);
        }
        line.geometry.attributes.position.needsUpdate = true;
    });
    controls.update();

    composer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});