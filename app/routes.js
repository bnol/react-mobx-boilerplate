const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) =>
  (componentModule) => {
    cb(null, componentModule.default);
  };

export default function createRoutes() {
  return [
    {
      path: '/(:filter)',
      name: 'todo',
      getComponent(nextState, cb) {
        import('containers/Todo')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
