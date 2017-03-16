import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import {
  ALL_TODOS,
  ACTIVE_TODOS,
  COMPLETED_TODOS,
} from 'containers/Todo/constants';
import { pluralize } from '../../utils';

@inject('router')
@observer
export default class TodoFooter extends Component {
  static defaultProps = {
    filter: ALL_TODOS,
  };

  static propTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    filter: PropTypes.string,
  };

  clearCompleted = () => {
    this.props.store.clearCompleted();
  };

  renderFilterLink(filterName, url, caption) {
    return (
      <li>
        <a
          href="javascript:;"
          onClick={() => this.props.router.push(url)}
          className={filterName === this.props.filter ? 'selected' : ''}
        >
          {caption}
        </a>
        {' '}
      </li>
    );
  }

  render() {
    const store = this.props.store;
    if (!store.activeTodoCount && !store.completedCount) return null;

    const activeTodoWord = pluralize(store.activeTodoCount, 'item');

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{store.activeTodoCount}</strong> {activeTodoWord} left
        </span>
        <ul className="filters">
          {this.renderFilterLink(ALL_TODOS, '', 'All')}
          {this.renderFilterLink(ACTIVE_TODOS, 'active', 'Active')}
          {this.renderFilterLink(COMPLETED_TODOS, 'completed', 'Completed')}
        </ul>
        {store.completedCount === 0
          ? null
          : <button className="clear-completed" onClick={this.clearCompleted}>
              Clear completed
          </button>}
      </footer>
    );
  }
}
