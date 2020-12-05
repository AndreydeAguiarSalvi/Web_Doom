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

    getSprite () {
        return this.sprite;
    }

}

class ChainGunner extends Enemy {
    constructor(positionX, positionY, positionZ) {
        super("MyImages/inimigo01.gif", 5, 6);
        this.setPosition(positionX, positionY, positionZ);
    }
}