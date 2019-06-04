// Reference to
// http://thndl.com/square-shaped-shaders.html

#ifdef GL_ES
precision mediump float;
#endif

#define TAU 6.28318530718

uniform vec2 u_resolution;

float ngon(vec2 st, int n) {
  // Remap the space to -1. to 1.
  st = st *2.-1.;
  // Angle from the current pixel
  float a = atan(st.y, st.x);

  /*
     Vertex ray is an imaginary ray that goes 
     from the center towards the corner vertex of a shape.
  */

  // Vertex ray stride angle, n - number of sides.
  float r = TAU/float(n); 

  /*
     Shaping function is based on dot product between
     the closest vertex ray and current pixel's position.

     By doing this the pixels are being weighted so the
     less colleniar ones are getting the bigger weight,
     thus arranging the resulting image's shape into linear
     cuts spanning between the adjacent vertices of the N-gon.
  */

  // Shaping function that modulate the distance
  float d = cos(floor(a/r+.5)*r-a)*length(st);

  return smoothstep(d-.01,d+.01,.5);
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);

  color = vec3(min(ngon(st, 3), ngon(st, 7)));  

  gl_FragColor = vec4(color,1.0);
}
