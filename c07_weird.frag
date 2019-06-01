
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float fill(float t, float pct, float m) {
  return smoothstep( pct, pct+m, t);
}

float plot(float t, float pct, float m) {
  return smoothstep( pct-m, pct, t)
       - smoothstep( pct, pct+m, t);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 pos = vec2(0.5)-st;

    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);

    float a1 = a +    u_time;
    float a2 = a - .5*u_time;
    float d = abs(cos(u_time*12.)*sin(u_time*3.))*0.064+0.396;

    float f1 = smoothstep(-0.716,0.632, cos(a1*10.))*(0.05 + 0.024*(sin(u_time) + 1.))+0.64+.4*d;
    float f2 = abs(cos(a2*12.)*sin(a1*3.))*0.064+0.396+.07*cos(3.*u_time);
    float f = fill(r, f2, .01) - fill(r, f1, .01);
    
    gl_FragColor = vec4(f, f, f, 1.);
}
