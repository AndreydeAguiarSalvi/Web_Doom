"use strict";

var baixo = false;  var cima = false; var esq = false; var dir = false;
document.onkeydown = function (event) {
    var tecla = event.keyCode;
    if (tecla == 83) baixo = true;
    if (tecla == 87) cima = true;
    if (tecla == 65) esq = true;
    if (tecla == 68) dir = true;
};

document.onkeyup = function (event) {
    var tecla = event.keyCode;
    if (tecla == 83) baixo = false;
    if (tecla == 87) cima = false;
    if (tecla == 65) esq = false;
    if (tecla == 68) dir = false;
};

class DoomGuy {
    
    constructor(cameraVerdadeira, width, height, depth) {

        this.I = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth),
                                                new Array());
        this.I.rotateX(Math.PI / 2);
        this.I.receiveShadow = true;
        this.cameraVerdadeira = cameraVerdadeira;
        this.I.add(this.cameraVerdadeira);

        //Variáveis relativas ao raycaster
        this.pontoFuturoGun = new THREE.Vector3();
        this.pontoFuturoGuy = new THREE.Vector3();
        this.raycaster = new THREE.Raycaster(); 
        this.intersects;
        this.colisaoFrente = 2;
        this.colisaoBaixo = 9;
        this.vetorChao = new THREE.Vector3(0, 0, -1);
        this.vetorNormalizado = new THREE.Vector3(0, 0, 0);

    }

    setCameraPosition (relativePositionX, relativePositionY, relativePositionZ) {
        this.cameraVerdadeira.position.set(relativePositionX, relativePositionY, relativePositionZ);
    }

    setPossibleColisions (colisoesPossiveis) {
        this.colisoesPossiveis = colisoesPossiveis;
    }

    setGun(gun) {
        this.gun = gun;
        this.I.add(this.gun.getGun());
    }

    getMyGun() {
        return this.gun.getGun();
    }

    setPosition(positionX, positionY, positionZ) {
        this.I.position.set(positionX, positionY, positionZ);
    }

    getDoomGuy() {
        return this.I;
    }

    addDoomGuyRotationY(angulo) {
        this.I.rotation.y += angulo;
    }

    getNormalizedFutureGunVector() {
        this.pontoFuturoGun.x = this.gun.getPosition().x + 1.2 * Math.cos(this.angulo);
        this.pontoFuturoGun.y = this.gun.getPosition().y + 1.2 * Math.sin(this.angulo);
        this.vetorNormalizado = this.pontoFuturoGun;
        this.vetorNormalizado.x = this.vetorNormalizado.x - this.gun.getPosition().x;
        this.vetorNormalizado.y = this.vetorNormalizado.y - this.gun.getPosition().y;
        this.vetorNormalizado = this.vetorNormalizado.clone().normalize();
        return this.vetorNormalizado;
    }

    gravity() {
        this.raycaster.far = this.colisaoBaixo;
        this.raycaster.set(this.I.position, this.vetorChao);
        this.intersects = this.raycaster.intersectObjects(this.colisoesPossiveis);
        if (this.intersects[0].distance < 2.5) {
            this.I.position.z += 2.5 - this.intersects[0].distance;
            this.pontoFuturoGun.z = this.I.position.z;
            this.pontoFuturoGuy.z = this.I.position.z;
        } else if (this.intersects[0].distance > 2.5) {
            this.I.position.z -= this.intersects[0].distance - 2.5;
            this.pontoFuturoGun.z = this.I.position.z;
            this.pontoFuturoGuy.z = this.I.position.z;
        }    
    }

    walk() {
        this.gravity();
        if (cima) {
            this.angulo = this.I.rotation.y + Math.PI / 2;

            this.pontoFuturoGun.x = this.gun.getPosition().x + 1.2 * Math.cos(this.angulo);
            this.pontoFuturoGun.y = this.gun.getPosition().y + 1.2 * Math.sin(this.angulo);

            this.vetorNormalizado = this.pontoFuturoGun;
            this.vetorNormalizado.x = this.vetorNormalizado.x - this.gun.getPosition().x;
            this.vetorNormalizado.y = this.vetorNormalizado.y - this.gun.getPosition().y;
            this.vetorNormalizado = this.vetorNormalizado.clone().normalize();

            this.raycaster.far = this.colisaoFrente;
            this.raycaster.set(this.gun.getPosition(), this.vetorNormalizado);
            this.intersects = this.raycaster.intersectObjects(this.colisoesPossiveis);
            if (this.intersects.length == 0) {
                this.I.position.x += this.pontoFuturoGun.x;
                this.I.position.y += this.pontoFuturoGun.y;
            }
        }
        if (baixo) {
            this.angulo = this.I.rotation.y + Math.PI / 2;

            this.pontoFuturoGuy.x = this.I.position.x - 1.2 * Math.cos(this.angulo);
            this.pontoFuturoGuy.y = this.I.position.y - 1.2 * Math.sin(this.angulo);

            this.vetorNormalizado = this.pontoFuturoGuy;
            this.vetorNormalizado.x = this.vetorNormalizado.x - this.I.position.x;
            this.vetorNormalizado.y = this.vetorNormalizado.y - this.I.position.y;
            this.vetorNormalizado = this.vetorNormalizado.clone().normalize();

            this.raycaster.far = this.colisaoFrente;
            this.raycaster.set(this.I.position, this.vetorNormalizado);
            this.intersects = this.raycaster.intersectObjects(this.colisoesPossiveis);
            if (this.intersects.length == 0) {
                this.I.position.x += this.pontoFuturoGuy.x;
                this.I.position.y += this.pontoFuturoGuy.y;
            }
        }
        if (esq) {
            this.angulo = this.I.rotation.y + Math.PI / 2;

            this.pontoFuturoGuy.x = this.I.position.x - 1.2 * Math.sin(this.angulo);
            this.pontoFuturoGuy.y = this.I.position.y + 1.2 * Math.cos(this.angulo);
            
            this.vetorNormalizado = this.pontoFuturoGuy;
            this.vetorNormalizado.x = this.vetorNormalizado.x - this.I.position.x;
            this.vetorNormalizado.y = this.vetorNormalizado.y - this.I.position.y;
            this.vetorNormalizado = this.vetorNormalizado.clone().normalize();

            this.raycaster.far = this.colisaoFrente;
            this.raycaster.set(this.I.position, this.vetorNormalizado);
            this.intersects = this.raycaster.intersectObjects(this.colisoesPossiveis);
            if (this.intersects.length == 0) {
                this.I.position.x += this.pontoFuturoGuy.x;
                this.I.position.y += this.pontoFuturoGuy.y;
            }
        }
        if (dir) {
            this.angulo = this.I.rotation.y + Math.PI / 2;

            this.pontoFuturoGuy.x = this.I.position.x + 1.2 * Math.sin(this.angulo);
            this.pontoFuturoGuy.y = this.I.position.y - 1.2 * Math.cos(this.angulo);
            
            this.vetorNormalizado = this.pontoFuturoGuy;
            this.vetorNormalizado.x = this.vetorNormalizado.x - this.I.position.x;
            this.vetorNormalizado.y = this.vetorNormalizado.y - this.I.position.y;
            this.vetorNormalizado = this.vetorNormalizado.clone().normalize();

            this.raycaster.far = this.colisaoFrente;
            this.raycaster.set(this.I.position, this.vetorNormalizado);
            this.intersects = this.raycaster.intersectObjects(this.colisoesPossiveis);
            if (this.intersects.length == 0) {
                this.I.position.x += this.pontoFuturoGuy.x;
                this.I.position.y += this.pontoFuturoGuy.y;
            }
        }
    }
        
}