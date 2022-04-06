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

	//getter
	get _todoText() {
		return this.input.value;
	}

	//setter
	_resetInput() {
		this.input.value = '';
	}

	//display list
	displayTodos(todos) {
		//delete nodes
		while (this.todoList.firstChild) {
			this.todoList.removeChild(this.todoList.firstChild);
		};
		if (todos.length === 0) {
			const p = this.createElement('p');
			p.textContent = 'Nothing on list. Add something?';
			this.todoList.append(p);
		} else {
			//todo item nodes
			todos.forEach(todo => {
				const li = this.createElement('li');
				li.id = todo.id;
				//checkbox for eaxh item
				const checkbox = this.createElement('input');
				checkbox.type = 'checkbox';
				checkbox.checked = todo.complete;
				//todo item in a span
				const span = this.createElement('span');
				span.contentEdit = true;
				span.classList.add('edit');
				//Complete todo
				if (todo.complete) {
					const strike = this.createElement('s');
					strike.textContent = todo.text;
					span.append(strike);
				} else {
					//Hust text
					span.textContent = todo.text;
				}

				//delete todo
				const deleteButton = this.createElement('button', 'delete');
				deleteButton.textContent = 'Delete';
				li.appened(checkbox, span, deleteButton);

				// add node to todo list
				this.todoList.append(li);
			});
		}

	}
	bindAddTodo(handler) {
		this.form.addEventListener('submit', event => {
			event.preventDefault();
			if(this._todoText) {
				handler(this._todoText);
				this._resetInput();
			};
		});
	}
	bindDeleteTodo(handler) {
		this.todoList.addEventListener('click', event => {
			if (event.target.className === 'delete') {
				const id = parseInt(event.target.parentElement.id);
				handler(id);
			};
		});
	}
	bindToggleTodo(handler) {
		this.todoList.addEventListener('change', event => {
			if (event.target.type === 'checkbox') {
				const id = parseInt(event.target.parentElement.id);
				handler(id);
			};
		});
	}

}

class Controller {
	Controller(model, view) {
		this.model = model;
		this.view = view;
		//display
		this.onTodoListChange(this.model.todos);
		this.view.bindAddTodo(this.handleAddTodo);
		this.view.bindDeleteTodo(this.handleDeleteTodo);
		this.view.bindToggleTodo(this.handleToggleTodo);
		// this.view.bindEditTodo(this.handleEditTodo) - We'll do this one last

	}
	onTodoListChange = (todos) => {
		this.view.displayTodos(todos);
	}
	handleAddTodo = (todoText) => {
		this.model.addTodo(todoText);
	}
	handleEditTodo = (id, todoText) => {
		this.model.editTodo(id, todoText); 
	}
	handleDeleteTodo = (id) => {
		this.model.deleteTodo(id);
	}
	handleToggleTodo = (id) => {
		this.model.toggleTodo(id);
	}
}

const app = new Controller(new Model(), new View());
