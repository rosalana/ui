#ifdef GL_ES
precision mediump float;
#endif

// Vertex attributes
attribute vec2 a_position;
attribute vec2 a_texcoord;

// Output to fragment shader
varying vec2 v_texcoord;

void main() {
  // Pass texcoord to fragment shader
  v_texcoord = a_texcoord;

  // Position is already in NDC [-1, 1]
  gl_Position = vec4(a_position, 0.0, 1.0);
}
