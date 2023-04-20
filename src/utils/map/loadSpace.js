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
    // Получить позицию
    this.positionX = props.x;
    this.positionZ = props.z;

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

    this.space.position.set(this.positionX, this.height / 2, this.positionZ);

    // Добавить на холст
    this.scene.add(this.space);
  }

  get get() {
    return this.space;
  }

  get size() {
    return { width: this.width, height: this.height, length: this.length };
  }

  get position() {
    // Грань по оси x
    this.minFaceX = this.positionX - this.width / 2;
    this.maxFaceX = this.positionX + this.width / 2;

    // Грань по оси y
    this.minFaceY = 0;
    this.maxFaceY = this.height;

    // Грань по оси z
    this.minFaceZ = this.positionZ - this.length / 2;
    this.maxFaceZ = this.positionZ + this.length / 2;

    const obj = {
      faceX: { min: this.minFaceX, max: this.maxFaceX },
      faceY: { min: this.minFaceY, max: this.maxFaceY },
      faceZ: { min: this.minFaceZ, max: this.maxFaceZ },
    };

    return obj;
  }
}