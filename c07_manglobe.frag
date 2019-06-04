
#ifdef GL_ES
precision mediump float;
#endif

#define PI   3.1415926536
#define PI_2 1.5707963268
#define PI_4 0.7853981634

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float polar_circle(float r, float t, float s, float m) {
    return smoothstep(s-m, s, r) - smoothstep(s, s+m, r);
}

float polar_sine(float r, float t, float s, float m) {
    float a = .5;

    r += a*s*sin(t);

    return smoothstep(a-m, a, r) - smoothstep(a, a+m, r);
}

float polar_ray(float r, float t, float a, float m) {
    m *= (1. - r*r);
    return (smoothstep(t-m, t, a) - smoothstep(t, t+m, a));
}

float ray(vec2 pos, float a, float m) {
    float c = cos(a);
    float s = sin(a);
    
    pos = vec2(pos.x*c + pos.y*s, pos.y*c - pos.x*s);

    return (smoothstep(-m, .0, pos.y) - smoothstep(.0, m, pos.y)) * step(.0, pos.x);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(.973, .976, .957);

    vec2 pos = st-vec2(0.5);

    float r = length(pos)*2.0;
    float a = atan(pos.y, pos.x);
    float c = r - .575;

    color = mix(color, vec3(0.522, 0.518, 0.502),
        (polar_ray(c, a, -PI_2,         .015)
       + polar_ray(c, a, -PI_2 - PI/3., .015)
       + polar_ray(c, a,  PI_2,         .015)
       + polar_ray(c, a,  PI_2 + PI/3., .015))
      * (step(c, 0.285) - step(c, .0))
      + (polar_ray(c, a, PI_2 - PI/5.,    .015)
       + polar_ray(c, a, PI_2 - 2.*PI/5., .015)
       + polar_ray(c, a, PI_2 - 3.*PI/5., .015)
       + polar_ray(c, a, PI_2 - 4.*PI/5., .015))
   	  * (step(c, 0.143) - step(c, .0))
      + (polar_circle(3.5*(c), a, .0, .026)
       + polar_circle(3.5*(c), a, .5, .026)
       + polar_circle(3.5*(c), a, 1., .026)
       + polar_sine(r - 0.218, 3.*(a - PI*0.5), .286, .014))
      * (step(a,-PI_2)+step(PI_2,a))  
      + (polar_circle(7.0*(c), a, .0, .054)
       + polar_circle(7.0*(c), a, .5, .054)
       + polar_circle(7.0*(c), a, 1., .054)
       + polar_sine(r - 0.146, 5.*(a + PI*0.5), .143, .014))
      * (step(a,PI_2)-step(a,-PI_2)));
    
    gl_FragColor = vec4(color, 1.0);
}
