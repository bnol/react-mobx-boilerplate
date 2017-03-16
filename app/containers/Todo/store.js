import { observable, computed, action } from 'mobx';
import TodoModel from '../../models/TodoModel';
import * as Utils from '../../utils';

class TodoStore {
  @observable todos = [];
  @observable todoBeingEdited = null;
  @observable editText = '';

  constructor() {
    this.todos.push(
      new TodoModel(this, Utils.uuid(), 'Taste JavaScript', true),
    );
    this.todos.push(new TodoModel(this, Utils.uuid(), 'Buy a unicorn', false));
  }

  @computed get activeTodoCount() {
    return this.todos.reduce((sum, todo) => sum + (todo.completed ? 0 : 1), 0);
  }

  @computed get completedCount() {
    return this.todos.length - this.activeTodoCount;
  }

  @action addTodo(title) {
    this.todos.push(new TodoModel(this, Utils.uuid(), title, false));
  }

  @action toggleAll(checked) {
    this.todos.forEach((todo) => { todo.completed = checked; });
  }

  @action clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }

  @action setBeingEditedTodo(todo) {
    this.todoBeingEdited = todo;
  }

  @action setEditText(text) {
    this.editText = text;
  }
}

export default new TodoStore();
