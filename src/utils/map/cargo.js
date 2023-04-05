import * as THREE from "three";

export default class Cargo {
  #colors = ["rgb(20, 100, 120)", "yellow", "lime"];

  constructor(props) {
    this.cargo = props.cargo;
    this.intersect = props.intersect;
    this.scene = props.scene;
    console.log(this.cargo.size.x);
  }

  create() {
    this.geometry = new THREE.BoxGeometry(this.cargo.size.x, this.cargo.size.y, this.cargo.size.z);
    this.material = new THREE.MeshBasicMaterial({
      color: this.#colors[0],
      opacity: 0.6,
      transparent: true,
    });
    this.block = new THREE.Mesh(this.geometry, this.material);

    this.block.position.copy(this.intersect.point).add(this.intersect.face.normal);
    this.block.position
      .divideScalar(this.cargo.size.x)
      .floor()
      .multiplyScalar(this.cargo.size.x)
      .addScalar(this.cargo.size.x / 2);

    this.scene.add(this.block);

    this.edges2 = new THREE.EdgesGeometry(
      new THREE.BoxGeometry(this.cargo.size.x, this.cargo.size.y, this.cargo.size.z)
    );
    this.line2 = new THREE.LineSegments(
      this.edges2,
      new THREE.LineBasicMaterial({
        color: "black",
      })
    );

    this.line2.position.copy(this.intersect.point).add(this.intersect.face.normal);
    this.line2.position
      .divideScalar(this.cargo.size.x)
      .floor()
      .multiplyScalar(this.cargo.size.x)
      .addScalar(this.cargo.size.x / 2);

    this.scene.add(this.line2);
  }

  get get() {
    return this.block;
  }
}
