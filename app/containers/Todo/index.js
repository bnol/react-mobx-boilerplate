/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import TodoList from 'components/Todo/TodoList';
import TodoFooter from 'components/Todo/TodoFooter';
import TodoEntry from 'components/Todo/TodoEntry';
import LocaleLink from 'components/Todo/TodoLocaleLink';
import messages from './messages';

@inject('todo', 'locale')
@observer
export default class Todo extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    locale: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  renderLocaleLink = (text, locale) => {
    const localeStore = this.props.locale;
    return (
      <LocaleLink
        href="javascript:;"
        active={locale === localeStore.locale}
        onClick={() => localeStore.changeLocale(locale)}
      >
        {text}
      </LocaleLink>
    );
  };

  render() {
    const { todo, params } = this.props;
    const todoFilter = params.filter;

    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1><FormattedMessage {...messages.header} /></h1>
            <TodoEntry store={todo} />
          </header>
          <TodoList store={todo} filter={todoFilter} />
          <TodoFooter store={todo} filter={todoFilter} />
        </section>
        <footer className="info">
          <p>
            {this.renderLocaleLink('English', 'en')}
            {' '}
            |
            {' '}
            {this.renderLocaleLink('Tiếng Việt', 'vi')}
          </p>
          <p>Double-click to edit a todo</p>
          <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
          <p>
            Created by
            {' '}
            <a href="https://github.com/bnol/react-mobx-boilerplate">BnoL</a>
          </p>
          <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
      </div>
    );
  }
}
