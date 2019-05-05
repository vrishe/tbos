
#ifdef GL_ES
precision mediump float;
#endif

float rect(in vec2 st, in vec2 pos, in vec2 size) {
  st.y = 1. - st.y;
  st -= (pos + .5*(size - 1.));
  
  vec2 uv = step(.25*(1.-size*size), st*(1.-st));
  
  return uv.x*uv.y;
}

float rect(in vec2 st, in vec2 pos, in vec2 size,
	float w) {
  st.y = 1. - st.y;
  st -= (pos + .5*(size - 1.));
  
  vec2 t, s = vec2(1.002, 1. + 0.002*size.y/size.x);

  t = .25*(1.-size*size);
  vec2 uv0 = smoothstep(t, s*t, st*(1.-st));
  t = .25*(1.-(size - w)*(size - w));
  vec2 uv1 = smoothstep(t, s*t, st*(1.-st));
  
  return uv0.x*uv0.y * (1. - uv1.x*uv1.y);    
}

uniform vec2 u_resolution;

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(0.0);

	color = mix(color, vec3(0.937, 0.910, 0.847),
			rect(st, vec2(0.236, 0.184), vec2(0.497, 0.164))
		+ rect(st, vec2(0.236, 0.000), vec2(0.497, 0.154))
		+ rect(st, vec2(0.761, 0.000), vec2(0.187, 0.154))
		+ rect(st, vec2(0.761, 0.184), vec2(0.187, 0.164))
		+ rect(st, vec2(0.000, 0.376), vec2(0.207, 0.624))
		+ rect(st, vec2(0.236, 0.376), vec2(0.497, 0.531))
		+ rect(st, vec2(0.761, 0.376), vec2(0.187, 0.531), 0.05)
		+ rect(st, vec2(0.972, 0.376), vec2(0.028, 0.531))
		+ rect(st, vec2(0.236, 0.931), vec2(0.497, 0.069))
	);

	color = mix(color, vec3(0.651, 0.122, 0.137),
			rect(st, vec2(0.000, 0.000), vec2(0.063, 0.154))
		+ rect(st, vec2(0.087, 0.000), vec2(0.121, 0.154))
		+ rect(st, vec2(0.000, 0.184), vec2(0.063, 0.164))
		+ rect(st, vec2(0.087, 0.184), vec2(0.121, 0.164), 0.05)
	);

	color = mix(color, vec3(0.976, 0.753, 0.129),
			rect(st, vec2(0.972, 0.000), vec2(0.028, 0.154))
		+ rect(st, vec2(0.972, 0.184), vec2(0.028, 0.164))
	);

	color = mix(color, vec3(0.000, 0.369, 0.596),
			rect(st, vec2(0.761, 0.931), vec2(0.187, 0.069))
		+ rect(st, vec2(0.972, 0.931), vec2(0.028, 0.069))
	);
    
  gl_FragColor = vec4(color, 1.0);
}
