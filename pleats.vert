#version 330 compatibility

out vec3 vMCposition;
out vec4  vColor;
out float vLightIntensity;
out vec3  vXYZ;
out vec3 vNormal;
out vec3 vL;
out vec3 vE;

vec3 uLightposition;
uniform float uLightX;
uniform float uLightY;
uniform float uLightZ;

uniform float uK; // major axis
uniform float uP;

const vec3 LIGHTPOS = vec3( 0., 0., 10. );
vec3 newpos = gl_Vertex.xyz;

void
main( )
{
  uLightposition.x = uLightX;
  uLightposition.y = uLightY;
  uLightposition.z = uLightZ;

  float x = newpos.x;
  float y = newpos.y;
  newpos.z = uK * (1. - y) * sin(2. * 3.14 * x/uP);

  float dzdx = uK * (1. - y) * (2. * 3.14/uP) * cos(2. * 3.14 * x/uP);
  float dzdy = -uK * sin(2. * 3.14 * x/uP);
  vec3 Tx = vec3(1.,0.,dzdx);
  vec3 Ty = vec3(0.,1.,dzdy);
  vec3 normal = normalize(cross(Tx,Ty));
  vNormal = normalize( gl_NormalMatrix * normal );

	vec3 ECposition = ( gl_ModelViewMatrix * vec4(newpos, 1.)).xyz;
	vLightIntensity  = abs( dot( normalize(LIGHTPOS - ECposition), normal ) );
  vL = uLightposition - ECposition.xyz;
  vE = vec3(0.,0.,0.) -ECposition.xyz;


	vMCposition = gl_Vertex.xyz;
	vColor = gl_Color;
	vXYZ = newpos.xyz;
	gl_Position = gl_ModelViewProjectionMatrix * vec4(newpos, 1.);
}