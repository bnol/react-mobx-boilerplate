import React, { Component } from 'react';
import { observer, PropTypes } from 'mobx-react';
import { expr } from 'mobx';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@observer
export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.observableObject.isRequired,
    store: React.PropTypes.object.isRequired,
  };

  handleEdit = () => {
    const { store, todo } = this.props;
    store.setEditText(todo.title);
    store.setBeingEditedTodo(todo);
  };

  handleDestroy = () => {
    const { store, todo } = this.props;
    todo.destroy();
    store.setBeingEditedTodo(null);
  };

  handleSubmit = () => {
    const { store, todo } = this.props;
    const val = store.editText.trim();
    if (val) {
      todo.setTitle(val);
      store.setEditText(val);
    } else {
      this.handleDestroy();
    }
    store.setBeingEditedTodo(null);
  };

  handleKeyDown = (event) => {
    const { store } = this.props;
    if (event.which === ESCAPE_KEY) {
      store.setEditText(this.props.todo.title);
      store.setBeingEditedTodo(null);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit();
    }
  };

  handleChange = (event) => {
    this.props.store.setEditText(event.target.value);
  };

  handleToggle = () => {
    this.props.todo.toggle();
  };

  render() {
    const { todo, store } = this.props;
    return (
      <li
        className={[
          todo.completed ? 'completed' : '',
          expr(() => todo === store.todoBeingEdited ? 'editing' : ''),
        ]
          .filter((c) => c)
          .join(' ')}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={this.handleToggle}
          />
          <label onDoubleClick={this.handleEdit}>{todo.title}</label>
          <button className="destroy" onClick={this.handleDestroy} />
        </div>
        <input
          className="edit"
          value={store.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
}
