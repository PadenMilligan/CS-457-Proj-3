#version 330 compatibility

in vec3 vMCposition;
in vec4  vColor;
in float vLightIntensity;
in vec3  vXYZ;
in vec3 vNormal;
in vec3 vL;
in vec3 vE;

uniform bool  uSmooth;
uniform float uNoiseAmp;
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

vec3
RotateNormal( float angx, float angy, vec3 n )
{
  float cx = cos( angx );
  float sx = sin( angx );
  float cy = cos( angy );
  float sy = sin( angy );

  // rotate about x:
  float yp =  n.y*cx - n.z*sx;    // y'
  n.z      =  n.y*sx + n.z*cx;    // z'
  n.y      =  yp;
  // n.x      =  n.x;

  // rotate about y:
  float xp =  n.x*cy + n.z*sy;    // x'
  n.z      = -n.x*sy + n.z*cy;    // z'
  n.x      =  xp;
  // n.y      =  n.y;

  return normalize( n );
}

void
main( )
{
  vec4 nvx = texture( Noise3, uNoiseFreq*vMCposition );
	float angx = nvx.r + nvx.g + nvx.b + nvx.a  -  2.;	// -1. to +1.
	angx *= uNoiseAmp;

  vec4 nvy = texture( Noise3, uNoiseFreq*vec3(vMCposition.xy,vMCposition.z+0.5) );
	float angy = nvy.r + nvy.g + nvy.b + nvy.a  -  2.;	// -1. to +1.
	angy *= uNoiseAmp;

  vec3 normal = RotateNormal(angx,angy,vNormal);
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