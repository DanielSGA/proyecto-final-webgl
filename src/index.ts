//Import de librerías y recursos
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
  PointLight,
  TextureLoader,
  MeshPhongMaterial} from "three";
import { OrbitControls } from 'three-orbitcontrols-ts';
import stadium from './textures/stadium.jpg';

//Declaración de elementos de la escena
const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth/innerHeight, 0.1, 1000);
const renderer = new WebGL1Renderer();
const light = new DirectionalLight(0xffffff, 1);

//Declaracion de orbit controls, renderizado de luces y sombras
let controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 0;
controls.maxDistance = 1500;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFShadowMap;

light.position.set(0,1,0);
light.castShadow = true;

//Declaración de geometrías
const geometry = new BoxGeometry();
const cylinderGeometry = new CylinderGeometry(0.5, 0.5, 1, 45);
const sphereGeometry = new SphereGeometry(0.41, 20, 20);
const model = new Geometry();

//Declaración de texturas
const volTexture = new TextureLoader().load('textures/voltorb.png')
const fieldTexture = new TextureLoader().load('textures/texturefield.jpg')

//Creación de materiales Phong con texturas y colores
const material = new MeshPhongMaterial({
  map: fieldTexture
});
const cyMaterial = new MeshPhongMaterial({
  color: 0x696969
});
const spheOneMat = new MeshPhongMaterial({
  map: volTexture
});
const spheTwoMat = new MeshPhongMaterial({
  map: volTexture
})
const platMaterial = new MeshPhongMaterial({
  color: 0x1A521B
});

////Creación de mesh para elementos en la escena
//Plataforma principal
const cube = new Mesh(geometry, material);

cube.castShadow = true;
cube.receiveShadow = false;
cube.position.x = 0;
cube.position.y = 1;
cube.scale.y = 0.1;
cube.scale.x = 8.5;
cube.scale.z = 3;
cube.rotation.x += 0

//Columna
const cylinder = new Mesh(cylinderGeometry, cyMaterial);

cylinder.castShadow = true;
cylinder.receiveShadow = true;
cylinder.position.y -= 0.5;
cylinder.position.z -= 0;
cylinder.scale.y = 3;
cylinder.rotation.x += 0;

//Voltorb 1
const sphereOne = new Mesh(sphereGeometry, spheOneMat);

sphereOne.position.y += 1.5;
sphereOne.position.x -= 1.8;

//Voltorb 2
const sphereTwo = new Mesh(sphereGeometry, spheTwoMat);

sphereTwo.position.y += 1.5;
sphereTwo.position.x += 1.8;
sphereTwo.rotation.y += 3;

//Plataforma flotante 1
const platformOne = new Mesh(geometry, platMaterial);

platformOne.position.x -= 1.8;
platformOne.position.y += 2.5;
platformOne.scale.y = 0.1;
platformOne.scale.x = 2;

//Plataforma flotante 2
const platformTwo = new Mesh(geometry, platMaterial);

platformTwo.position.x += 1.8;
platformTwo.position.y += 2.5;
platformTwo.scale.y = 0.1;
platformTwo.scale.x = 2;

//Agregar elementos a la escena
scene.add(cube);
scene.add(cylinder);
scene.add(sphereOne);
scene.add(sphereTwo);
scene.add(platformOne);
scene.add(platformTwo);

//Luces
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 1000;

//Posición de cámara
camera.position.y = 1.5;
camera.position.z = 6;
camera.position.x = 0;

//Declaración y generación de SkyBox
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

//Traslación de Voltorb con flechas del teclado
var xSpeed = 0.5;
var ySpeed = 0.7;

document.body.addEventListener("keydown", onDocumentKeyDown, false);

function onDocumentKeyDown(event: KeyboardEvent) {
    var keyCode = event.key;
    if (keyCode == "ArrowUp") {
        sphereTwo.position.y += ySpeed;
    } else if (keyCode == "ArrowDown") {
        sphereTwo.position.y -= ySpeed;
    } else if (keyCode == "ArrowLeft") {
        sphereTwo.position.x -= xSpeed;
    } else if (keyCode == "ArrowRight") {
        sphereTwo.position.x += xSpeed;
    } else if (keyCode == "Space") {
        sphereTwo.position.set(0, 0, 0);
    }
};

//PointLights para luces y sombras de la escena
var pointLight1 = new PointLight(0xFFFFFF, 1, 500)
pointLight1.position.set(0,0.5,0);
scene.add(pointLight1);

var pointLight2 = new PointLight(0xFFFFFF, 3, 500)
pointLight2.position.set(1.8,5,5.5);
pointLight2.castShadow = true;
scene.add(pointLight2);

//Función animate para renderizar escena
const animate = () => {
  requestAnimationFrame(animate);

  //Para rotar el modelo
  sphereTwo.rotation.z -= 0.1;

  renderer.render(scene, camera);
}

//Start up
animate();