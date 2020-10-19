"use strict";

var myAudio = new Audio('MyAudio/Shawns Got the Shotgun.mp3');
myAudio.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
}, false);
// myAudio.play();


var colisoesPossiveis = []; var click = false; var xi; var colisaoTiro = [];
var rayTiro = new THREE.Raycaster(); rayTiro.far = 30; var pAtual = -1;


var cena = new THREE.Scene();
var cameraVerdadeira = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


var guy = new DoomGuy(cameraVerdadeira, 5, 6, 1);
guy.setPosition(0, -6, -7.5);
guy.setCameraPosition(0, 1.7, -2);
cena.add(guy.getDoomGuy());
CreateCenario(cena, colisoesPossiveis);


function initMesh(url, mesh4, mapa, x, y, z) {
    var loader = new THREE.JSONLoader();
    loader.load(url, function (geometry) {
        mesh4 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ map: mapa }));
        mesh4.scale.set(10,10,10);
        mesh4.position.set(x,y,z);
        mesh4.castShadow = true;
        mesh4.receiveShadow = true;
        mesh4.rotateX(Math.PI / 2);
        colisoesPossiveis.push(mesh4);
        cena.add(mesh4);
    });
}
var mesh4 = null;
var mapa = new THREE.TextureLoader().load( "MyImages/chao1.png" );
mapa.wrapS = THREE.RepeatWrapping;
mapa.wrapT = THREE.RepeatWrapping;
mapa.repeat.set(16, 16);
var url = "cenario/mapa3.json";
initMesh(url,mesh4, mapa, 0, 0, -10);


/////////////////////////////////////////////////////Renderizador
var render = new THREE.WebGLRenderer({ antialias: true });
render.shadowMap.enabled = true;
render.shadowMapSoft = true;
render.setSize(window.innerWidth, window.innerHeight);
var canvas = render.domElement;
document.body.appendChild(canvas);


///////////////////////////////////////////////////////////Inimigos
var inimigo1 = new Enemy("MyImages/inimigo01.gif", 5, 6);
inimigo1.setPosition(-5, 10, -7.5);
var inimigo2 = new Enemy("MyImages/inimigo01.gif", 5, 6);
inimigo2.setPosition(5, 10, -7.5);
var inimigo3 = new Enemy("MyImages/inimigo02.gif", 9, 9);
inimigo3.setPosition(0, 18, -6);
var inimigo4 = new Enemy("MyImages/inimigo04.gif", 9, 9);
inimigo4.setPosition(24, 29, -6);
cena.add(inimigo1.getEnemy()); cena.add(inimigo2.getEnemy());
cena.add(inimigo3.getEnemy()); cena.add(inimigo4.getEnemy());
colisoesPossiveis.push(inimigo1.getEnemy());
colisoesPossiveis.push(inimigo2.getEnemy());
colisoesPossiveis.push(inimigo3.getEnemy());
colisoesPossiveis.push(inimigo4.getEnemy());


////////////////////////////Pilar, altar, helmo, barril, luzPonto
var pilar = new Pilar("MyImages/detalhe1.png", 2, 2, 2, 10, 10, -9);
cena.add(pilar);
colisoesPossiveis.push(pilar);
var pilar = new Pilar("MyImages/detalhe2.png", 4, 4, 4, 20, 15, -8);
cena.add(pilar);
colisoesPossiveis.push(pilar);
var barril = new Barril("MyImages/barril.jpg", 1.3, 4, 32, -7, 12, -8);
cena.add(barril);
colisoesPossiveis.push(barril);
var altar = new Barril("MyImages/chao4.png", 2.3, 2, 6, 0, 6, -9);
cena.add(altar);
colisoesPossiveis.push(altar);
var texturaHelmo = new THREE.TextureLoader().load("MyImages/helmo.png");
var materialHelmo = new THREE.MeshLambertMaterial({map: texturaHelmo, transparent: true});
var helmo = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 0, 1, 1, 1), new THREE.MeshFaceMaterial(materialHelmo));
helmo.position.set(0, 6, -7.5);
helmo.rotateX(Math.PI / 2);
helmo.castShadow = true;
cena.add(helmo);
colisoesPossiveis.push(helmo);
var barril = new Barril("MyImages/barril.jpg", 1.3, 4, 32, 7, 12, -8);
cena.add(barril);
colisoesPossiveis.push(barril);
var luzPonto = new THREE.PointLight(0X777777, 3);
luzPonto.position.set(0, 15, -4);
luzPonto.castShadow = true;
cena.add(luzPonto);
var luzPonto2 = new THREE.PointLight(0X555555, 3);
luzPonto.position.set(0, 35, -4);
luzPonto.castShadow = true;
cena.add(luzPonto2);


guy.setPossibleColisions(colisoesPossiveis);
//Arma na frente do personagem
var arma = new Gun("MyImages/gun.png", 3, 3);
guy.setGun(arma);


canvas.addEventListener("mousemove", function (e) {
    if (e.offsetX > xi) {
        guy.addDoomGuyRotationY(-(e.offsetX - xi) * (Math.PI / 180))
    }
    if (e.offsetX < xi) {
        guy.addDoomGuyRotationY((xi - e.offsetX) * (Math.PI / 180))
    }
    xi = e.offsetX;
}, false);


var group = new SPE.Group({
        texture: {
            value: THREE.ImageUtils.loadTexture('Effects/img/sprite-explosion.png'),
            frames: new THREE.Vector2(5, 5),
            loop: 1
        },
        depthTest: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        scale: 600
    }),
    shockwaveGroup = new SPE.Group({
        texture: {
            value: THREE.ImageUtils.loadTexture('Effects/img/smokeparticle.png'),
        },
        depthTest: false,
        depthWrite: true,
        blending: THREE.NormalBlending,
    }),
    shockwave = new SPE.Emitter({
        particleCount: 200,
        type: SPE.distributions.DISC,
        position: {
            radius: 5,
            spread: new THREE.Vector3(5)
        },
        maxAge: {
            value: 2,
            spread: 0
        },
        // duration: 1,
        activeMultiplier: 2000,

        velocity: {
            value: new THREE.Vector3(40)
        },
        rotation: {
            axis: new THREE.Vector3(1, 0, 0),
            angle: Math.PI * 0.5,
            static: true
        },
        size: { value: 2 },
        color: {
            value: [
                new THREE.Color(0.4, 0.2, 0.1),
                new THREE.Color(0.2, 0.2, 0.2)
            ]
        },
        opacity: { value: [0.5, 0.2, 0] }
    }),
    debris = new SPE.Emitter({
        particleCount: 100,
        type: SPE.distributions.SPHERE,
        position: {
            radius: 0.1,
        },
        maxAge: {
            value: 2
        },
        // duration: 2,
        activeMultiplier: 40,

        velocity: {
            value: new THREE.Vector3(100)
        },
        acceleration: {
            value: new THREE.Vector3(0, -20, 0),
            distribution: SPE.distributions.BOX
        },
        size: { value: 2 },
        drag: {
            value: 1
        },
        color: {
            value: [
                new THREE.Color(1, 1, 1),
                new THREE.Color(1, 1, 0),
                new THREE.Color(1, 0, 0),
                new THREE.Color(0.4, 0.2, 0.1)
            ]
        },
        opacity: { value: [0.4, 0] }
    }),
    fireball = new SPE.Emitter({
        particleCount: 20,
        type: SPE.distributions.SPHERE,
        position: {
            radius: 1
        },
        maxAge: { value: 2 },
        // duration: 1,
        activeMultiplier: 20,
        velocity: {
            value: new THREE.Vector3(10)
        },
        size: { value: [20, 100] },
        color: {
            value: [
                new THREE.Color(0.5, 0.1, 0.05),
                new THREE.Color(0.2, 0.2, 0.2)
            ]
        },
        opacity: { value: [0.5, 0.35, 0.1, 0] }
    }),
    mist = new SPE.Emitter({
        particleCount: 50,
        position: {
            spread: new THREE.Vector3(10, 10, 10),
            distribution: SPE.distributions.SPHERE
        },
        maxAge: { value: 2 },
        // duration: 1,
        activeMultiplier: 2000,
        velocity: {
            value: new THREE.Vector3(8, 3, 10),
            distribution: SPE.distributions.SPHERE
        },
        size: { value: 40 },
        color: {
            value: new THREE.Color(0.2, 0.2, 0.2)
        },
        opacity: { value: [0, 0, 0.2, 0] }
    }),
    flash = new SPE.Emitter({
        particleCount: 50,
        position: { spread: new THREE.Vector3(5, 5, 5) },
        velocity: {
            spread: new THREE.Vector3(30),
            distribution: SPE.distributions.SPHERE
        },
        size: { value: [2, 20, 20, 20] },
        maxAge: { value: 2 },
        activeMultiplier: 2000,
        opacity: { value: [0.5, 0.25, 0, 0] }
    });

    
group.addEmitter(fireball).addEmitter(flash);
shockwaveGroup.addEmitter(debris).addEmitter(mist);
group.mesh.position.set(0, 10, -7.5);
cena.add(shockwaveGroup.mesh);
cena.add(group.mesh);

canvas.addEventListener("mousedown", function (e) {
    click = true;
    rayTiro.set(guy.getDoomGuy().position, guy.getNormalizedFutureGunVector());
    colisaoTiro = rayTiro.intersectObjects(colisoesPossiveis);
    group.mesh.position.set(
        colisaoTiro[0].position.x, colisaoTiro[0].position.y, colisaoTiro[0].position.z);
}, false);

//////////////////////////////////////////////////////////O "Main"
function desenhar() {
    render.render(cena, cameraVerdadeira);
    requestAnimationFrame(desenhar);
    guy.walk();
    group.tick(pAtual);
    if(click){
        pAtual++;
        if (pAtual == 26){
            click = false;
            pAtual = -1;
        }
    }
}
requestAnimationFrame(desenhar);
