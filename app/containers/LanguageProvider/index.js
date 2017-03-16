/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React, { PureComponent } from 'react';
import { IntlProvider } from 'react-intl';
import { observer, inject } from 'mobx-react';

@inject('locale')
@observer
export class LanguageProvider extends PureComponent {  // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    locale: React.PropTypes.object,
    messages: React.PropTypes.object,
    children: React.PropTypes.element.isRequired,
  };

  render() {
    const { locale } = this.props.locale;
    return (
      <IntlProvider
        locale={locale}
        key={locale}
        messages={this.props.messages[locale]}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

export default LanguageProvider;
