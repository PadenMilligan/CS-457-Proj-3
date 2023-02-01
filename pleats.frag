#version 330 compatibility

in vec3 vMCposition;
in vec4  vColor;
in float vLightIntensity;
in vec3  vXYZ;
in vec3 vNormal;
in vec3 vL;
in vec3 vE;

uniform bool  uSmooth;
uniform float uNoiseMag;
uniform float uNoiseFreq;
uniform sampler3D Noise3;
uniform float uK; // major axis
uniform float uP; // minor axis
uniform float uKd;
uniform float uKa;
uniform float uKs;
uniform float uShininess;
uniform vec4 uSpecularColor;
uniform float uTol;
uniform vec4  uColor;

void
main( )
{
  vec3 normal = normalize(vNormal);
  vec3 light = normalize(vL);
  vec3 eye = normalize(vE);

  vec4 myColor = uColor;
  
  vec4 ambient = uKa * myColor;
  float d = 0.;
  float s = 0.;
  if(dot(normal,light)>0.){
    d = dot(normal,light);
    vec3 R = normalize(reflect(-light, normal));
    s = pow(max(dot(eye,R),0.),uShininess);
  }
  vec4 diffuse = uKd * d * myColor;
  vec4 specular = uKs * s * uSpecularColor;
  gl_FragColor = vec4(ambient + diffuse + specular);
}