import { section, type Article } from "../schema";

export default {
  title: "Sandbox",
  description: "WebGL shader rendering, textures, modules and frame export.",
  sections: [
    section(
      "usage",
      "Create in the browser",
      "Sandbox is re-exported by @rosalana/ui from @rosalana/sandbox. Create it after the canvas mounts and destroy it when the component unmounts.",
      `import { onMounted, onUnmounted, ref } from 'vue';
import { Sandbox } from '@rosalana/ui';

const canvas = ref<HTMLCanvasElement | null>(null);
let sandbox: Sandbox | undefined;

onMounted(() => {
  if (!canvas.value) return;
  sandbox = Sandbox.create(canvas.value, {
    fragment: \`precision mediump float;
void main() { gl_FragColor = vec4(0.23, 0.51, 0.96, 1.0); }\`,
    autoplay: false,
  });
  sandbox.render();
});
onUnmounted(() => sandbox?.destroy());`,
    ),
    section(
      "playback",
      "Playback and uniforms",
      "Use play, pause, toggle, time or renderAt for playback. setUniform and setUniforms update shader inputs. setTexture accepts image, video or canvas sources. hook registers before/after render callbacks and returns an unsubscribe function.",
    ),
    section(
      "modules",
      "Shader modules",
      "Sandbox.defineModule registers reusable GLSL snippets. Sandbox.compile resolves module imports into final GLSL, and availableModules lists registered modules. Use module on an instance to configure runtime module uniforms.",
    ),
    section(
      "export",
      "Export and release resources",
      "exportAsURL, exportAsBlob and exportAsImage export a frame; stream returns a MediaStream. Enable preserveDrawingBuffer when exporting during playback. Remove unused textures and always destroy the instance to release GPU resources.",
    ),
  ],
} satisfies Article;
