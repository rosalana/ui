import { inject, provide, ref, type InjectionKey, type Ref } from "vue";

type AvatarContext = {
  /** Number of mounted `UiAvatarImage`s, so loading knows an image is on its way. */
  images: Ref<number>;
};

const AVATAR_CONTEXT: InjectionKey<AvatarContext> = Symbol("UiAvatar");

export function provideAvatarContext(): AvatarContext {
  const context = { images: ref(0) };
  provide(AVATAR_CONTEXT, context);
  return context;
}

export function injectAvatarContext(): AvatarContext | undefined {
  return inject(AVATAR_CONTEXT, undefined);
}
