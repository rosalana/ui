#ifdef GL_ES
precision mediump float;
#endif

// Built-in uniforms
uniform vec2 u_resolution;
uniform float u_time;

// Input from vertex shader
varying vec2 v_texcoord;

void main() {
  // Normalized coordinates (0-1)
  vec2 uv = v_texcoord;

  // Simple gradient based on position and time
  vec3 color = vec3(uv.x, uv.y, 0.5 + 0.5 * sin(u_time));

  gl_FragColor = vec4(color, 1.0);
}
