export default class Uniforms {
  private uniforms: Map<string, any> = new Map<string, any>();

  set(name: string, value: any): void {
    this.uniforms.set(name, value);
  }

  get(name: string): any | undefined {
    return this.uniforms.get(name);
  }

  has(name: string): boolean {
    return this.uniforms.has(name);
  }

  delete(name: string): boolean {
    return this.uniforms.delete(name);
  }

  destroy(): void {
    this.uniforms.clear();
  }
}
