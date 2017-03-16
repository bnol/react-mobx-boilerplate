import { observable, action } from 'mobx';

class LanguageProviderStore {
  @observable locale = 'en';
  @action changeLocale(locale) {
    this.locale = locale;
  }
}

export default new LanguageProviderStore();
