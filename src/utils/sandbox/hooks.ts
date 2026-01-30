import { ClockState, HookCallback } from "./types";

export default class Hooks {
  private hooks: Map<string, HookCallback> = new Map();

  private id(): string {
    return Math.random().toString(36).substring(2, 10);
  }

  /** Add a new hook, returns a removal function */
  public add(hook: HookCallback): typeof this.remove {
    const id = this.id();
    this.hooks.set(id, hook);
    return () => this.remove(id);
  }

  /** Remove a hook by its ID */
  public remove(id: string): void {
    this.hooks.delete(id);
  }

  /** Run all hooks with the given state */
  public run(state: ClockState): void {
    this.hooks.forEach((hook) => {
      hook(state);
    });
  }

  public destroy(): void {
    this.hooks.clear();
  }
}
