import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

const ENTER_KEY = 13;

@observer
export default class TodoEntry extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  handleKeyDown = (e) => {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }

    e.preventDefault();
    const title = this.title.value.trim();
    if (title) {
      this.props.store.addTodo(title);
      this.title.value = '';
    }
  };

  render() {
    return (
      <input
        ref={(ref) => { this.title = ref; }}
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={this.handleKeyDown}
        autoFocus
      />
    );
  }
}
