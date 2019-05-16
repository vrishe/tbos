
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float disk(in vec2 st, in vec2 pos, in float size) {
    float d = distance(pos, st);
    
    return smoothstep(d, d + 0.008, size / 2. + 0.004);
}

float disk2(in vec2 st, in vec2 pos, in float size) {
    vec2 d = st-pos;
    
    size *= size;
    return 1. - smoothstep(
        0.99*size, 1.01*size,
        4.*dot(d,d));
}

float heartbeat(float t, float duration) {
    vec2 pts[12];
    pts[0]  = vec2(.000, .000);
    pts[1]  = vec2(.023,-.330);
    pts[2]  = vec2(.073, .400);
    pts[3]  = vec2(.169,-1.00);
    pts[4]  = vec2(.306, 1.00);
    pts[5]  = vec2(.375, .000);
    pts[6]  = vec2(.475, .000);
    pts[7]  = vec2(.498,-.330);
    pts[8]  = vec2(.548, .400);
    pts[9]  = vec2(.644,-1.00);
    pts[10] = vec2(.781, 1.00);
    pts[11] = vec2(.850, .000);
    
    t = fract(t / duration);
    for (int i = 1; i < 12; ++i) {
        vec2 p0 = pts[i - 1];
        vec2 p1 = pts[i];
        
        if (t < p1.x) {
            return mix(p0.y, p1.y, (t - p0.x) / (p1.x - p0.x));
        }
    }

    return .0;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0);

    float r = .75 + .1 * heartbeat(u_time, 1.3);
    color = mix(color, vec3(1.,.667,.985), disk2(st, vec2(.5,.5), r));
        
    gl_FragColor = vec4( color, 1.0 );
}
