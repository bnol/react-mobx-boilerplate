import { useStrict } from 'mobx';
import { RouterStore } from 'mobx-react-router';
import localeStore from 'containers/LanguageProvider/store';
import todoStore from 'containers/Todo/store';

useStrict(true);
export const routerStore = new RouterStore();

/**
 * Create the store with asynchronously loaded reducers
 */
const configureStore = () => ({
  locale: localeStore,
  router: routerStore,
  todo: todoStore,
});

export default configureStore;
