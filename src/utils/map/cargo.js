import * as THREE from "three";

export default class Cargo {
  constructor(scene, { name, width, height, length, color }) {
    // Сцена холста
    this.scene = scene;

    // Размеры груза
    this.width = width;
    this.height = height;
    this.length = length;

    // Цвет груза
    this.color = color;

    // Имя груза
    this.name = name;

    this.geometry = new THREE.BoxGeometry(this.width, this.height, this.length);
    this.material = new THREE.MeshBasicMaterial({
      color: this.color,
      opacity: 0.6,
      transparent: true,
    });

    this.edges2 = new THREE.EdgesGeometry(new THREE.BoxGeometry(this.width, this.height, this.length));
    this.line = new THREE.LineSegments(
      this.edges2,
      new THREE.LineBasicMaterial({
        color: "black",
      })
    );

    this.block = new THREE.Mesh(this.geometry, this.material);
    this.block.name = this.name;
  }

  setBlockPosition(block, line, props) {
    block.position.set(props.x, this.height / 2, props.z);
    line.position.set(props.x, this.height / 2, props.z);
    // this.scene.add(this.block, this.line);
    // block.position.addScalar(this.height / 2);
    // line.position.addScalar(this.height / 2);
  }

  checkTouching(a, d) {
    let b1 = a.position.y - a.geometry.parameters.height / 2;
    let t1 = a.position.y + a.geometry.parameters.height / 2;
    let r1 = a.position.x + a.geometry.parameters.width / 2;
    let l1 = a.position.x - a.geometry.parameters.width / 2;
    let f1 = a.position.z - a.geometry.parameters.depth / 2;
    let B1 = a.position.z + a.geometry.parameters.depth / 2;
    let b2 = d.position.y - d.geometry.parameters.height / 2;
    let t2 = d.position.y + d.geometry.parameters.height / 2;
    let r2 = d.position.x + d.geometry.parameters.width / 2;
    let l2 = d.position.x - d.geometry.parameters.width / 2;
    let f2 = d.position.z - d.geometry.parameters.depth / 2;
    let B2 = d.position.z + d.geometry.parameters.depth / 2;
    if (t1 < b2 || r1 < l2 || b1 > t2 || l1 > r2 || f1 > B2 || B1 < f2) {
      return false;
    }
    return true;
  }

  arrange(objects, index) {
    // const size = this.block.geometry.parameters;
    const newObjects = objects.filter((object) => object.geometry.type !== "PlaneGeometry");

    if (!index) {
      this.block.position.y = this.height / 2;
      this.line.position.y = this.height / 2;
      this.scene.add(this.block, this.line);
      return;
    }

    for (let i = 0; i < newObjects.length; i++) {
      while (this.checkTouching(this.block, newObjects[i])) {
        if (this.block.position.y > 18) {
          this.block.position.x += 0.1;
          this.line.position.x += 0.1;
          if (!this.checkTouching(this.block, newObjects[i])) {
            this.block.position.y = this.height / 2;
            this.line.position.y = this.height / 2;
          }
        } else {
          this.block.position.y += 0.1;
          this.line.position.y += 0.1;
        }
        console.log("step");
      }
    }
    this.scene.add(this.block, this.line);

    // const position = this.block.position;
    // console.log(newObjects);
    // for (let i = 0; i < newObjects.length; i++) {
    //   if (position.x === newObjects[i].position.x) {
    //     this.setBlockPosition(this.block, this.line, {
    //       x: position.x + newObjects[i].geometry.parameters.width,
    //       y: 0,
    //       z: 0,
    //     });
    //   } else {
    //     this.setBlockPosition(this.block, this.line, { x: position.x, y: position.y, z: position.z });
    //   }
    // }

    // this.scene.add(this.line);
    // this.block.position.set(props.x, props.y, props.z);
    // this.line.position.set(props.x, props.y, props.z);
  }

  create(intersect) {
    this.block.position.copy(intersect.point).add(intersect.face.normal);
    this.block.position
      .divideScalar(this.width)
      .floor()
      .multiplyScalar(this.width)
      .addScalar(this.width / 2);

    this.scene.add(this.block);

    this.edges2 = new THREE.EdgesGeometry(new THREE.BoxGeometry(this.width, this.height, this.length));
    this.line = new THREE.LineSegments(
      this.edges2,
      new THREE.LineBasicMaterial({
        color: "black",
      })
    );

    this.line.position.copy(intersect.point).add(intersect.face.normal);
    this.line.position
      .divideScalar(this.width)
      .floor()
      .multiplyScalar(this.width)
      .addScalar(this.width / 2);

    this.scene.add(this.line);
  }

  get get() {
    return this.block;
  }
}
