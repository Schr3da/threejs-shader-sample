export const fragmentShader = () => {
  return `
      uniform mat4 modelMatrix; 
      uniform mat4 modelViewMatrix;
      uniform vec3 colorA; 
      uniform vec3 colorB; 
      uniform float scale;
      uniform float power; 
      uniform vec3 vLightPosition;
      
      varying vec3 vNormal;
      varying vec3 vUv;
      varying vec3 vPosition;


      vec3 toneToHeatColorMap(in float tone) {
        if(tone > 0.95) 
          return vec3(0.0, 0.0, 1.0);
        else if(tone  > 0.80)
          return vec3(0.0, 0.2+tone, 0.0);
        else if(tone > 0.25) 
          return vec3(1.0, tone, 0.0);
        else if(tone > 0.1) 
          return vec3(1.0-tone, 0.0, 0.0);
        
        return vec3(0.4, 0.05, 0.2); 
      }

      void main() {
        
        vec3 fresnel = vec3(1.0, 1.0, 1.0);
        vec3 pos2World = (modelViewMatrix * vec4(vPosition, 1.0)).xyz; 
        vec3 norm2World = normalize(modelViewMatrix * vec4(vNormal, 1.0)).xyz;
        vec3 cameraPos2World = (modelViewMatrix * vec4(viewMatrix[0][3], viewMatrix[1][3], viewMatrix[2][3], 1.0)).xyz;
   
        vec3 lightVectorW = normalize(vec3(vec4( vLightPosition, 1.0) * modelMatrix) - vPosition);

        float ndl = max(0.0, dot(vNormal, lightVectorW));
    
        vec3 I = normalize(pos2World - cameraPos2World);
	    float R = scale * pow(1.0 + dot(I, norm2World), power);
	
        vec3 color = vec3(0);
    
        color = clamp(mix(color, fresnel, R), 0.0, 1.0);
    
        gl_FragColor = vec4( toneToHeatColorMap(color.r), 1.0 );
      }
`;
};
