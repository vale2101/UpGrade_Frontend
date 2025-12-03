declare global {
  function describe(name: string, fn: () => void): void;
  function it(name: string, fn: () => void): void;
  function expect(value: any): {
    toBe: (expected: any) => void;
    toEqual: (expected: any) => void;
    toContain: (expected: any) => void;
    toHaveLength: (expected: number) => void;
    toBeDefined: () => void;
    toBeNull: () => void;
    toBeTruthy: () => void;
    toBeFalsy: () => void;
    every: (fn: (item: any) => boolean) => boolean;
    not: {
      toBe: (expected: any) => void;
      toBeNull: () => void;
    };
  };
  function beforeEach(fn: () => void): void;
  namespace jest {
    function mock(module: string): void;
    function clearAllMocks(): void;
    interface Mocked<T> {
      [key: string]: any;
    }
  }
  const axios: {
    get: any;
    post: any;
    put: any;
    delete: any;
    defaults: any;
  };
}

export {};

