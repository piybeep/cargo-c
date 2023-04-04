import * as THREE from "three";

export default class Cargo {
  constructor(props) {
    this.size = props.size;
    this.intersect = props.intersect;
    this.scene = props.scene;
  }

  create() {
    const colors = ["rgb(20, 100, 120)", "yellow", "lime"];
    this.cubeGeo = new THREE.BoxGeometry(this.size, this.size, this.size);
    this.cubeMaterial = new THREE.MeshBasicMaterial({
      color: colors[0],
      opacity: 0.6,
      transparent: true,
    });
    this.voxel = new THREE.Mesh(this.cubeGeo, this.cubeMaterial);
    this.voxel.position.copy(this.intersect.point).add(this.intersect.face.normal);
    this.voxel.position
      .divideScalar(this.size)
      .floor()
      .multiplyScalar(this.size)
      .addScalar(this.size / 2);
    this.scene.add(this.voxel);

    this.edges2 = new THREE.EdgesGeometry(new THREE.BoxGeometry(this.size, this.size, this.size));
    this.line2 = new THREE.LineSegments(
      this.edges2,
      new THREE.LineBasicMaterial({
        color: "black",
      })
    );
    this.line2.position.copy(this.intersect.point).add(this.intersect.face.normal);
    this.line2.position
      .divideScalar(this.size)
      .floor()
      .multiplyScalar(this.size)
      .addScalar(this.size / 2);
    this.scene.add(this.line2);
  }
  get cargo() {
    return this.voxel;
  }
}
