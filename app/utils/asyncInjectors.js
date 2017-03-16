export function injectAsyncStore(stores) {
  return function injectStore(name, asyncStore) {
    stores[name] = asyncStore; // eslint-disable-line no-param-reassign
  };
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(stores) {
  return {
    injectStore: injectAsyncStore(stores),
  };
}
