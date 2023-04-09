import * as THREE from "three";

export default class Cargo {
  constructor(scene, { width, height, length, color }) {
    // Сцена холста
    this.scene = scene;

    // Размеры груза
    this.width = width;
    this.height = height;
    this.length = length;

    // Цвет груза
    this.color = color;

    this.geometry = new THREE.BoxGeometry(this.width, this.height, this.length);
    this.material = new THREE.MeshBasicMaterial({
      color: this.color,
      opacity: 0.6,
      transparent: true,
    });

    this.edges2 = new THREE.EdgesGeometry(new THREE.BoxGeometry(this.width, this.height, this.length));
    this.line2 = new THREE.LineSegments(
      this.edges2,
      new THREE.LineBasicMaterial({
        color: "black",
      })
    );

    this.block = new THREE.Mesh(this.geometry, this.material);
  }

  arrange(props) {
    this.block.position.set(props.x, props.y, props.z);
    this.block.position.addScalar(this.height / 2);

    this.scene.add(this.block);

    this.line2.position.set(props.x, props.y, props.z);
    this.line2.position.addScalar(this.height / 2);

    this.scene.add(this.line2);
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
    this.line2 = new THREE.LineSegments(
      this.edges2,
      new THREE.LineBasicMaterial({
        color: "black",
      })
    );

    this.line2.position.copy(intersect.point).add(intersect.face.normal);
    this.line2.position
      .divideScalar(this.width)
      .floor()
      .multiplyScalar(this.width)
      .addScalar(this.width / 2);

    this.scene.add(this.line2);
  }

  get get() {
    return this.block;
  }
}
