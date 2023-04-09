import * as THREE from "three";

export default class LoadSpace {
  constructor(scene, { width, height, length }) {
    // Сцена холста
    this.scene = scene;

    // Размеры грузового пространства
    this.width = width;
    this.height = height;
    this.length = length;
  }

  // Создать грозовое пространство
  create(props) {
    // Создать размеры
    this.geometry = new THREE.BoxGeometry(this.width, this.height, this.length);

    // Создать края
    this.edges = new THREE.EdgesGeometry(this.geometry);

    // Визуализировать грузовое пространство
    this.space = new THREE.LineSegments(
      this.edges,
      new THREE.LineBasicMaterial({
        color: "black",
      })
    );

    this.space.position.set(props.x, props.y, props.z);
    this.space.position.addScalar(this.height / 2);

    // Добавить на холст
    this.scene.add(this.space);
  }
}
