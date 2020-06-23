import * as THREE from "three";

import {fragmentShader} from "../shaders/heat/fragment";
import {vertexShader} from "../shaders/heat/vertex";

export class Scene extends THREE.Scene {

  private renderer = new THREE.WebGLRenderer();
  private camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  private cube: THREE.Mesh | null = null; 

  public init(): void {

    const geometry = new THREE.BoxGeometry(1, 2, 2);
   
    const uniforms = {
        vLightPosition: {type: "vec3", value: new THREE.Vector3(1, 1, 1)}, 
        scale: {type: "float", value: 1.1},
        power: {type: "float", value: 0.9},
        modelMatrix: {type: "mat4", value: this.matrixWorld},
        modelViewMatrix: {type: "mat4", value: this.modelViewMatrix},
    };

    const material = new THREE.ShaderMaterial( {
	  uniforms,
	  vertexShader: vertexShader(),
	  fragmentShader: fragmentShader(), 
    });

    this.cube = new THREE.Mesh( geometry, material );
    
    this.add( this.cube );
    this.camera.position.z = 5;
    this.renderer.compile(this, this.camera);
  }

  public addToParent(element: HTMLElement) {
    this.renderer.setSize(element.offsetWidth, element.offsetHeight);
    element.appendChild(this.renderer.domElement);
  }

  public render = (): void => {
    requestAnimationFrame(this.render);
     
    if (this.cube != null) {
      this.cube.rotateX(0.01);
      this.cube.rotateY(0.01);
    }

    this.renderer.render(this, this.camera);
  }

  public dispose(): void {
    super.dispose();
  }
}
