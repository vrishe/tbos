
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;

float df_disk_interpret(float d, float r) {
  r *= r;
  return step(r, d);
}

float disk(vec2 st, float r) {
  return 1. - df_disk_interpret(4.*dot(st, st), r);
}

float ring(vec2 st, float r1, float r2) {
  float d = 4.*dot(st, st);
  return (1. - df_disk_interpret(d, r2))
    * df_disk_interpret(d, r1);
}

float ray(vec2 st, float thickness) {
    return step(.0, st.x) * step(abs(st.y), .5*thickness);
}

vec2 rotate(vec2 v, float deg) {
    float rad = radians(deg);
    float c = cos(rad);
    float s = sin(rad);
    
    return vec2(c*v.x + s*v.y, c*v.y - s*v.x);
}

vec3 color_Bg = vec3(1.);
vec3 color_Fg = vec3(.863,0.281,0.078);

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(1.);

  st -= vec2(.5);

  float d = disk(st, 1.0);
  color = mix(color, color_Fg, d);
  color = mix(color, color_Bg, ring(st, 0.395, 0.58));
  color = mix(color, color_Fg,
      disk(rotate(st,  60.0) - vec2(0.347, .0), 0.185)
    + disk(rotate(st, 180.0) - vec2(0.347, .0), 0.185)
    + disk(rotate(st, 300.0) - vec2(0.347, .0), 0.185));
  color = mix(color, color_Bg,
      disk(rotate(st,  60.0) - vec2(0.347, .0), 0.14)
    + disk(rotate(st, 180.0) - vec2(0.347, .0), 0.14)
    + disk(rotate(st, 300.0) - vec2(0.347, .0), 0.14));
  color = mix(color, color_Fg,
     d * (ray(rotate(st,  0.0), 0.035)
      + ray(rotate(st,  120.0), 0.035)
      + ray(rotate(st,  240.0), 0.035)));

  gl_FragColor = vec4(color,1.0);
}