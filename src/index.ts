import { loadScript } from './loadScript';

const FUNNELBRANCH_WINDOW_VARIABLE = 'Funnelbranch';

interface FunnelbranchWindowClass {
  initialize(projectId: string, options: Options): FunnelbranchWindowInstance;
}

interface FunnelbranchWindowInstance {
  submitEvent(event?: string): void;
  destroy(): void;
}

type Options = {
  controlGroup?: string;
  enableLocalhost?: boolean;
  trackClientUrlChanges?: boolean;
  trackClientHashChanges?: boolean;
};

export class Funnelbranch {
  public static initialize(projectId: string, options = {} as Options): Promise<Funnelbranch> {
    return loadScript()
      .then(() => {
        if (FUNNELBRANCH_WINDOW_VARIABLE in window) {
          return this.initializeFromWindowClass(projectId, options);
        }
        throw new Error(`Funnelbranch: failed to access '${FUNNELBRANCH_WINDOW_VARIABLE}' window variable`);
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  private static initializeFromWindowClass(projectId: string, options: Options): Funnelbranch {
    const WindowClass = (window as any)[FUNNELBRANCH_WINDOW_VARIABLE] as FunnelbranchWindowClass;
    const windowInstance = WindowClass.initialize(projectId, options);
    return new Funnelbranch(windowInstance);
  }

  private constructor(private readonly delegate: FunnelbranchWindowInstance) {}

  public submitEvent(event?: string): void {
    return this.delegate.submitEvent(event);
  }

  public destroy(): void {
    return this.delegate.destroy();
  }
}
