class Model {
	constructor() {}
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