export const vertexShader = () => {
  return `
    precision highp float;
    precision highp int;

    attribute vec2 uv2;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vUv; 

    void main() {
      vNormal = normal;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
};
