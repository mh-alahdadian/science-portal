export function createEvent<Events extends Record<string, (...args: any[]) => any>>() {
  const listeners: Partial<Record<keyof Events, Set<any>>> = {};

  function getListeners<K extends keyof Events>(name: K) {
    if (!listeners[name]) listeners[name] = new Set();
    return listeners[name] as Set<Events[K]>;
  }

  function register<K extends keyof Events>(name: K, fn: Events[K]) {
    getListeners(name).add(fn);
    return () => getListeners(name).delete(fn);
  }

  function unregister<K extends keyof Events>(name: K, fn: Events[K]) {
    getListeners(name).delete(fn);
  }

  function emit<K extends keyof Events>(name: K, ...args: Parameters<Events[K]>) {
    getListeners(name).forEach((fn) => fn(...args));
  }

  return [emit, register] as const;
}
