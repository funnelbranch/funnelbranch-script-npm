import { loadScript } from './loadScript';

declare const BUILD_PACKAGE_VERSION: string;

const FUNNELBRANCH_WINDOW_VARIABLE = 'Funnelbranch';

interface FunnelbranchWindowClass {
  scriptVersion(): string;
  initialize(projectId: string, options: Options): FunnelbranchWindowInstance;
}

interface FunnelbranchWindowInstance {
  submitEvent(event?: string): void;
  destroy(): void;
}

export type Options = {
  controlGroup?: string;
  enableLocalhost?: boolean;
  trackClientUrlChanges?: boolean;
  trackClientHashChanges?: boolean;
};

export class Funnelbranch {
  public static npmPackageVersion(): string {
    return BUILD_PACKAGE_VERSION;
  }

  public static scriptVersion(): Promise<string> {
    return this.loadScript()
      .then(() => ((window as any)[FUNNELBRANCH_WINDOW_VARIABLE] as FunnelbranchWindowClass).scriptVersion())
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  public static initialize(projectId: string, options = {} as Options): Promise<Funnelbranch> {
    return this.loadScript()
      .then(() => {
        const Class = (window as any)[FUNNELBRANCH_WINDOW_VARIABLE] as FunnelbranchWindowClass;
        const instance = Class.initialize(
          projectId,
          Object.assign({}, options, { __extraHeaders: Object.assign({}, (options as any).__extraHeaders, { 'NPM-Package-Version': BUILD_PACKAGE_VERSION }) })
        );
        return new Funnelbranch(instance);
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  private static loadScript(): Promise<void> {
    if (FUNNELBRANCH_WINDOW_VARIABLE in window) {
      return Promise.resolve();
    }
    return loadScript().then(() => {
      if (!(FUNNELBRANCH_WINDOW_VARIABLE in window)) {
        throw new Error(`Funnelbranch: failed to access '${FUNNELBRANCH_WINDOW_VARIABLE}' window variable`);
      }
    });
  }

  private constructor(private readonly delegate: FunnelbranchWindowInstance) {}

  public submitEvent(event?: string): void {
    return this.delegate.submitEvent(event);
  }

  public destroy(): void {
    return this.delegate.destroy();
  }
}
