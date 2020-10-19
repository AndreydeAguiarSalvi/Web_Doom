"use strict";

class Enemy {

    constructor (texturePath, width, height) {
        var map = new THREE.TextureLoader().load( texturePath );
        var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
        this.sprite = new THREE.Sprite( material );
        this.sprite.scale.set(width, height, 1);
    }

    setPosition (positionX, positionY, positionZ) {
        this.sprite.position.set(positionX, positionY, positionZ);
    }

    getEnemy () {
        return this.sprite;
    }

}

class Gun {

    constructor(texturePath, width, height) {
        var map = new THREE.TextureLoader().load( texturePath );
        var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
        this.sprite = new THREE.Sprite( material );
        this.sprite.position.set(0, -1, -7.5);
        this.sprite.scale.set(width, height, 1);
        this.sprite.receiveShadow = true;
    }

    getGun() {
        return this.sprite;
    }

    getPosition () {
        return this.sprite.getWorldPosition();
    }

}

var Pilar = function (caminhoTextura, width, height, depth, positionX, positionY, positionZ) {

    var texturaPilar = new THREE.TextureLoader().load(caminhoTextura);
    var materialPilar = new THREE.MeshLambertMaterial({ map: texturaPilar });
    var pilar = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth),
        materialPilar);
    pilar.rotateX(Math.PI / 2);
    pilar.position.set(positionX, positionY, positionZ);
    pilar.castShadow = true;
    pilar.receiveShadow = true;
    return pilar;

};

var Barril = function (caminhoTextura, radius, height, radiusSegments, positionX, positionY, positionZ) {

    var texturaPilar = new THREE.TextureLoader().load(caminhoTextura);
    var geometry = new THREE.CylinderGeometry(radius, radius, height, radiusSegments);
    var material = new THREE.MeshLambertMaterial({ map: texturaPilar });
    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.rotateX(Math.PI / 2);
    cylinder.position.set(positionX, positionY, positionZ);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    return cylinder;

};