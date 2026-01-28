export interface SandboxOptions {
    /** Vertex shader source code.*/
    vertex?: string;
    /** Fragment shader source code.*/
    fragment?: string;
    /** Auto-play the sandbox on creation. default: true */
    autoplay?: boolean;
    /** Pause rendering when the canvas is not visible in the viewport. default: true */
    pauseWhenHidden?: boolean;
    /** Device pixel ratio for rendering. default: window.devicePixelRatio */
    dpr?: number | "auto";
    /** Whether to preserve the drawing buffer. default: false */
    preserveDrawingBuffer?: boolean;
    /** Enable or disable antialiasing. default: true */
    antialias?: boolean;
    /** Callback for handling errors during shader compilation or runtime. */
    onError?: (error: Error) => void;
    /** Callback invoked when the sandbox has finished loading. */
    onLoad?: () => void;
}

export type ResolvedSandboxOptions = Required<SandboxOptions>;