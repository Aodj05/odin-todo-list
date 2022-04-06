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
	constructor(){
		//root element
		this.app = this.getElement('#content');

		//Title
		this.title = this.createElement('h1');
		this.title.textContent = 'Todos';

		//Form and Buttons
		this.form = this.createElement('form');
		this.input = this.createElement('input');
		this.input.type = 'text';
		this.input.placeholder = 'Add a todo';
		this.input.name = 'todo';
		this.submitButton = this.createElement('button');
		this.submitButton.textContent = 'Submit';

		//Todo list
		this.todoList = this.createElement('ul', 'todo-list');

		//add buttons to form
		this.form.append(this.input, this.submitButton);

		//add title, form, and list
		this.app.append(this.title, this.form, this.todoList);
	}
	//create element with a css class
	createElement(tag, className) {
		const element = document.createElement(tag);
		if(className) element.classList.add(className);
		return element
	}
	//Get element from DOM
	getElement(select) {
		const element = document.querySelector(select);
		return element;
	}
}

class Controller {
	Controller(model, view) {
		this.model = model;
		this.view = view;
	}
}

const app = new Controller(new Model(), new View());
