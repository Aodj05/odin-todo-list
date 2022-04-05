class Model {
	constructor() {
		// Array of todo objects
		this.todos = [
			{id: 1, text: 'init node', complete: false},
			{id: 2, text: 'init webpack', complete: false},
		]
	}

	addTodo(todoText) {
		const todo = {
			id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
			text: todoText,
			complete: false,
		}
		this.todos.push(todo);
	}

	//Map todos array and replace text with ids
	editTodo(id, updatedText) {
		this.todos = this.todos.map((todo) =>
		todo.id === id ? {id: todo.id, text: updatedText, complete: todo.complete}: todo, 
		);
	}

	//Take a todo from array by id
	deleteTodo(id) {
		this.todos = this.todos.filter((todo) => todo.id !== id);
	}

	//Change boolean on the id
	toggleTodo(id) {
		this.todos  = this.todos.map((todo) =>
			todo.id === id ? {id: todo.id, text: todo.text, completr: !todo.complete} : todo, 
			);
	}
}

class View {
	constructor(){}
}

class Controller {
	Controller(model, view) {
		this.model = model;
		this.view = view;
	}
}

const app = new Controller(new Model(), new View());