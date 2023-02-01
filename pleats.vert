#version 330 compatibility

out vec3 vMCposition;
out vec4  vColor;
out float vLightIntensity;
out vec3  vXYZ;

uniform float uK; // major axis
uniform float uP;

const vec3 LIGHTPOS = vec3( 0., 0., 10. );
vec3 vert = gl_Vertex.xyz;

void
main( )
{

  float x = vert.x;
  float y = vert.y;
  vert.z = uK * (0. - y) * sin(2. * 3.14 * x/uP);

  float dzdx = uK * (0. - y) * (2. * 3.14/uP) * cos(2. * 3.14 * x/uP);
  float dzdy = -uK * sin(2. * 3.14 * x/uP);
  vec3 Tx = vec3(1.,0.,dzdx);
  vec3 Ty = vec3(0.,1.,dzdy);
  vec3 normal = normalize(cross(Tx,Ty));
	vec3 ECposition = ( gl_ModelViewMatrix * vert ).xyz;
	vLightIntensity  = abs( dot( normalize(LIGHTPOS - ECposition), normal ) );



	vMCposition = gl_Vertex.xyz;
	vColor = gl_Color;
	vXYZ = vert.xyz;
	gl_Position = gl_ModelViewProjectionMatrix * vert;
}