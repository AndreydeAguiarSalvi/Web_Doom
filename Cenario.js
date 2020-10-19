"use strict";

function CreateCenario(cena, colisoesPossiveis){

    var texture = new THREE.TextureLoader().load("MyImages/chao4.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(32, 32);
    var material = new THREE.MeshLambertMaterial({ map: texture });
    var planoChao = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), material);
    planoChao.material.side = THREE.DoubleSide;
    planoChao.receiveShadow = true;
    planoChao.castShadow = true;
    planoChao.translateZ(1);
    planoChao.position.z = -10;
    cena.add(planoChao);
    colisoesPossiveis.push(planoChao);

    var texture = new THREE.TextureLoader().load("MyImages/chao4.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(32, 32);
    var material = new THREE.MeshLambertMaterial({ map: texture });
    var planoTeto = new THREE.Mesh(new THREE.PlaneGeometry(110, 100), material);
    planoTeto.material.side = THREE.DoubleSide;
    planoTeto.receiveShadow = true;
    planoTeto.position.z = 0;
    colisoesPossiveis.push(planoTeto);
    cena.add(planoTeto);

    var texture = new THREE.TextureLoader().load("MyImages/parede1.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    var material = new THREE.MeshLambertMaterial({ map: texture });
    var parede = new THREE.Mesh(new THREE.PlaneGeometry(40, 20), material);
    parede.material.side = THREE.DoubleSide;
    parede.receiveShadow = true;
    parede.translateZ(1);
    parede.position.set(15, 15, -10);
    parede.rotateX(Math.PI / 2);
    parede.rotateY(Math.PI / 2);
    colisoesPossiveis.push(parede);
    cena.add(parede);

    var texture = new THREE.TextureLoader().load("MyImages/parede3.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 1);
    var material = new THREE.MeshLambertMaterial({ map: texture });
    var parede = new THREE.Mesh(new THREE.PlaneGeometry(40, 3.4), material);
    parede.material.side = THREE.DoubleSide;
    parede.receiveShadow = true;
    parede.position.set(35, 35, -8);
    parede.rotateX(Math.PI / 2);
    cena.add(parede);
    colisoesPossiveis.push(parede);

    var parede = new THREE.Mesh(new THREE.PlaneGeometry(40, 3.4), material);
    parede.material.side = THREE.DoubleSide;
    parede.receiveShadow = true;
    parede.position.set(35, 35, -1.8);
    parede.rotateX(Math.PI / 2);
    cena.add(parede);
    colisoesPossiveis.push(parede);

    var texture = new THREE.TextureLoader().load("MyImages/parede1.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    var material = new THREE.MeshLambertMaterial({ map: texture });
    var parede = new THREE.Mesh(new THREE.PlaneGeometry(40, 20), material);
    parede.material.side = THREE.DoubleSide;
    parede.receiveShadow = true;
    parede.translateZ(1);
    parede.position.set(-15, 15, -10);
    parede.rotateX(Math.PI / 2);
    parede.rotateY(Math.PI / 2);
    cena.add(parede);
    colisoesPossiveis.push(parede);


    var texture = new THREE.TextureLoader().load("MyImages/parede3.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    var material = new THREE.MeshLambertMaterial({ map: texture });
    var parede1 = new THREE.Mesh(new THREE.PlaneGeometry(30, 20), material);
    parede1.material.side = THREE.DoubleSide;
    parede1.castShadow = true;
    parede1.position.set(0, -13, -6);
    parede1.rotateX(Math.PI / 2);
    cena.add(parede1);
    colisoesPossiveis.push(parede1);


    var texture = new THREE.TextureLoader().load("MyImages/detalhe3.jpg");
    var material = new THREE.MeshLambertMaterial({ map: texture });
    var parede3 = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), material);
    parede3.receiveShadow = true;
    parede3.castShadow = true;
    // parede3.position.set(0, 35.1, -6);
    parede3.position.set(-14.9, 10, -6);
    parede3.rotateX(Math.PI / 2);
    parede3.rotateY(Math.PI / 2);
    cena.add(parede3);
    colisoesPossiveis.push(parede3);

    var luzAmbiente = new THREE.AmbientLight(0x555555);
    cena.add(luzAmbiente);

}

function createMaterial(path, setA, setB) {
    var texture = new THREE.TextureLoader().load(path);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(setA, setB);
    var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 1 });
    return material;
}
