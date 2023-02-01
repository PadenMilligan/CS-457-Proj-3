#version 330 compatibility

in vec3 vMCposition;
in vec4  vColor;
in float vLightIntensity;
in vec3  vXYZ;

uniform bool  uSmooth;
uniform float uNoiseMag;
uniform float uNoiseFreq;
uniform sampler3D Noise3;
uniform float uK; // major axis
uniform float uP; // minor axis
uniform float uTol;
uniform vec4  uColor = vec4(1.0, 0.0, 0.0, 1.0);

void
main( )
{
  float x = vXYZ.x;
  float y = vXYZ.y;
  float z = vXYZ.z;
  
  float t1 = smoothstep(1.-uTol, 1.+uTol,z);
  gl_FragColor = mix(uColor, vColor, t1);
  gl_FragColor.rgb *= vLightIntensity;
}