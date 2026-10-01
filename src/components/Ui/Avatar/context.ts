import { inject, provide, ref, type InjectionKey, type Ref } from "vue";

type AvatarContext = {
  /** Number of mounted `UiAvatarImage`s, so loading knows an image is on its way. */
  images: Ref<number>;
  /** Source of the avatar image, so loading can tell whether it was loaded before. */
  src: Ref<string | undefined>;
};

const AVATAR_CONTEXT: InjectionKey<AvatarContext> = Symbol("UiAvatar");

/**
 * Sources this browser has already loaded. A remounted avatar (e.g. after SPA navigation)
 * gets its image right away, so it skips loading. Only filled on the client,
 * so server rendering and hydration always agree.
 */
export const loadedSources = new Set<string>();

export function provideAvatarContext(): AvatarContext {
  const context = { images: ref(0), src: ref<string>() };
  provide(AVATAR_CONTEXT, context);
  return context;
}

export function injectAvatarContext(): AvatarContext | undefined {
  return inject(AVATAR_CONTEXT, undefined);
}
