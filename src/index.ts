import { 
  Scene, 
  PerspectiveCamera, 
  WebGL1Renderer, 
  BoxGeometry, 
  MeshBasicMaterial, 
  MeshLambertMaterial,
  CubeTextureLoader,
  Mesh, 
  CylinderGeometry, 
  PCFShadowMap, 
  DirectionalLight, 
  SphereGeometry, 
  LinearFilter,
  BackSide,
  Geometry, 
  ImageUtils,
  TextureLoader} from "three";
import { OrbitControls } from 'three-orbitcontrols-ts';
import stadium from './textures/stadium.jpg';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth/innerHeight, 0.1, 1000);
const renderer = new WebGL1Renderer();
const light = new DirectionalLight(0xffffff, 1);

let controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 0;
controls.maxDistance = 1500;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFShadowMap;

light.position.set(0,1,0);
light.castShadow = true;

const geometry = new BoxGeometry();
const cylinderGeometry = new CylinderGeometry(0.5, 0.5, 1, 45);
const sphereGeometry = new SphereGeometry(0.41, 20, 20);
const model = new Geometry();

const volTexture = new TextureLoader().load('textures/voltorb.png')

const material = new MeshBasicMaterial({
  color: 0x1A521B
});
const cyMaterial = new MeshBasicMaterial({
  color: 0x696969
});
const spheOneMat = new MeshBasicMaterial({
  map: volTexture
});
const spheTwoMat = new MeshBasicMaterial({
  map: volTexture
})

const cube = new Mesh(geometry, material);

cube.castShadow = true;
cube.receiveShadow = false;
cube.position.x = 0;
cube.position.y = 1;
cube.scale.y = 0.1;
cube.scale.x = 8.5;
cube.scale.z = 3;
cube.rotation.x += 0


const cylinder = new Mesh(cylinderGeometry, cyMaterial);

cylinder.castShadow = true;
cylinder.receiveShadow = true;
cylinder.position.y -= 0.5;
cylinder.position.z -= 0;
cylinder.scale.y = 3;
cylinder.rotation.x += 0;


const sphereOne = new Mesh(sphereGeometry, spheOneMat);

sphereOne.position.y += 1.5;
sphereOne.position.x -= 1.8;

const sphereTwo = new Mesh(sphereGeometry, spheTwoMat);

sphereTwo.position.y += 1.5;
sphereTwo.position.x += 1.8;
sphereTwo.rotation.y += 3;

const platformOne = new Mesh(geometry, material);

platformOne.position.x -= 1.8;
platformOne.position.y += 2.5;
platformOne.scale.y = 0.1;
platformOne.scale.x = 2;

const platformTwo = new Mesh(geometry, material);

platformTwo.position.x += 1.8;
platformTwo.position.y += 2.5;
platformTwo.scale.y = 0.1;
platformTwo.scale.x = 2;

scene.add(cube);
scene.add(cylinder);
scene.add(sphereOne);
scene.add(sphereTwo);
scene.add(platformOne);
scene.add(platformTwo);


light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 1000;

camera.position.y = 1.7;
camera.position.z = 6;
camera.position.x = 0;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let loader = new TextureLoader().load(stadium);
loader.minFilter = LinearFilter;
scene.background = loader;

let materialArray = [];
let texture_ft = new TextureLoader().load(stadium);
let texture_bk = new TextureLoader().load(stadium);
let texture_up = new TextureLoader().load(stadium);
let texture_dn = new TextureLoader().load(stadium);
let texture_rt = new TextureLoader().load(stadium);
let texture_lf = new TextureLoader().load(stadium);
  
materialArray.push(new MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new MeshBasicMaterial( { map: texture_up }));
materialArray.push(new MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new MeshBasicMaterial( { map: texture_lf }));
for (let i = 0; i < 6; i++)
  materialArray[i].side = BackSide;
   
let skyboxGeo = new BoxGeometry( 10000, 10000, 10000);
let skybox = new Mesh( skyboxGeo, materialArray );
scene.add( skybox );

const animate = () => {
  requestAnimationFrame(animate);

  //Para rotar el modelo
  //modelMesh.rotation.y += 0.01

  renderer.render(scene, camera);
}

animate();