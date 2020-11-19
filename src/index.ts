import { 
  Scene, 
  PerspectiveCamera, 
  WebGL1Renderer, 
  BoxGeometry, 
  MeshBasicMaterial, 
  Mesh, 
  CylinderGeometry, 
  PCFShadowMap, 
  DirectionalLight, 
  SphereGeometry, 
  Geometry } from "three";

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth/innerHeight, 0.1, 1000);
const renderer = new WebGL1Renderer();
const light = new DirectionalLight(0xffffff, 1);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFShadowMap;

light.position.set(0,1,0);
light.castShadow = true;


const geometry = new BoxGeometry();
const cylinderGeometry = new CylinderGeometry(0.5, 0.5, 1, 45);
const sphereGeometry = new SphereGeometry(0.41, 20, 20);
const model = new Geometry();


const material = new MeshBasicMaterial({
  color: 0x1A521B
});
const cyMaterial = new MeshBasicMaterial({
  color: 0x696969
});
const spheOneMat = new MeshBasicMaterial({
  color: 0xD40000
});
const spheTwoMat = new MeshBasicMaterial({
  color: 0xD40000
})

const cube = new Mesh(geometry, material);

cube.castShadow = true;
cube.receiveShadow = false;
cube.position.x = 0;
cube.position.y = 1;
cube.scale.y = 0.1;
cube.scale.x = 6;
cube.scale.z = 3;
cube.rotation.x += 0


const cylinder = new Mesh(cylinderGeometry, cyMaterial);

cylinder.castShadow = true;
cylinder.receiveShadow = true;
cylinder.position.y -= 0.7;
cylinder.position.z -= 0;
cylinder.scale.y = 3;
cylinder.rotation.x += 0;

const sphereOne = new Mesh(sphereGeometry, spheOneMat);

sphereOne.position.y += 1.5;
sphereOne.position.x -= 1.8;

const sphereTwo = new Mesh(sphereGeometry, spheTwoMat);

sphereTwo.position.y += 1.5;
sphereTwo.position.x += 1.8;

const platformOne = new Mesh(geometry, material);

platformOne.position.x -= 1.8;
platformOne.position.y += 2.1;
platformOne.scale.y = 0.1;
platformOne.scale.x = 2;
//platformOne.rotation.x += 0.5;

const platformTwo = new Mesh(geometry, material);

platformTwo.position.x += 1.8;
platformTwo.position.y += 2.1;
platformTwo.scale.y = 0.1;
platformTwo.scale.x = 2;
//platformTwo.rotation.x += 0.5;

/**
 * Juntar geometrías en una sola
*//*
cube.updateMatrix();
model.merge(cube.geometry, cube.matrix);
cylinder.updateMatrix();
model.merge(cylinder.geometry, cylinder.matrix);
sphereOne.updateMatrix();
model.merge(sphereOne.geometry, sphereOne.matrix);
sphereTwo.updateMatrix();
model.merge(sphereTwo.geometry, sphereTwo.matrix);
platformOne.updateMatrix();
model.merge(platformOne.geometry, platformOne.matrix);
platformTwo.updateMatrix();
model.merge(platformTwo.geometry, platformTwo.matrix);

const modelMesh = new Mesh(model, material);

scene.add(light);
scene.add(modelMesh);
*/
/*
 * Para agregar texturas después
 */
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



const animate = () => {
  //requestAnimationFrame(animate)

  //Para rotar el modelo
  //modelMesh.rotation.y += 0.01

  renderer.render(scene, camera);
}

//animate();