import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import {
  ALL_TODOS,
  ACTIVE_TODOS,
  COMPLETED_TODOS,
} from 'containers/Todo/constants';
import TodoItem from './TodoItem';

@observer
export default class TodoList extends Component {
  static defaultProps = {
    filter: ALL_TODOS,
  };

  static propTypes = {
    store: PropTypes.object.isRequired,
    filter: PropTypes.string,
  };

  getVisibleTodos() {
    const { store, filter } = this.props;
    return store.todos.filter((todo) => {
      switch (filter) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });
  }

  toggleAll = (event) => {
    const checked = event.target.checked;
    this.props.store.toggleAll(checked);
  };

  render() {
    const { store } = this.props;
    return (
      <section className="main">
        <input
          className="toggle-all"
          type="checkbox"
          onChange={this.toggleAll}
          checked={store.activeTodoCount === 0}
        />
        <ul className="todo-list">
          {this.getVisibleTodos().map((todo) => (
            <TodoItem key={todo.id} todo={todo} store={store} />
          ))}
        </ul>
      </section>
    );
  }
}
