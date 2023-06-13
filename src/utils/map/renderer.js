import * as THREE from "three";

export default class Renderer {
  constructor(settings) {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: settings.canvas,
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(settings.width, settings.height);
    this.renderer.setClearColor("#fff", 1);
  }
}
