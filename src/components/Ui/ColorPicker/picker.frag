#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_hue;

out vec4 fragColor;

vec3 hsv2rgb(float h, float s, float v) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + K.xyz) * 6.0 - K.www);
    return v * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), s);
}

void main() {
    // uv.x = saturation, uv.y = value (WebGL Y=0 bottom = dark, Y=1 top = bright)
    vec2 uv = gl_FragCoord.xy / u_resolution;
    fragColor = vec4(hsv2rgb(u_hue / 360.0, uv.x, uv.y), 1.0);
}
