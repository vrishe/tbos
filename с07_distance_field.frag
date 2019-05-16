
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926536

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 rotate(vec2 v, vec2 c, float r) {
    float _c = cos(r);
    float _s = sin(r);

    v -= c;
    return vec2(
        _c*v.x - _s*v.y + c.x,
        _s*v.x + _c*v.y + c.y);
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec2 a = rotate(vec2(.33), vec2(.5),  u_time);
    vec2 b = rotate(vec2(.66), vec2(.5), -u_time);

	vec3 color = vec3(mix(
            pow(distance(st,a),distance(st,b)),
            min(distance(st,a),distance(st,b)),
    	.5 + .5*sin(u_time)));
    
	gl_FragColor = vec4(color, 1.0);
}
