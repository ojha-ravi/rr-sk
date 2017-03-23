const redux = require("redux");

const todo = (state, action) => {
	switch(action.type) {
		case "ADD_TODO":
			return {
				id: action.id,
				text: action.text,
				completed: false
			};
		case "TOGGLE_TODO":
			if (state.id === action.id) {
				return Object.assign({}, state, {
					completed: !state.completed
				});
			}
			return state;
		default:
			state;
	}
}

const todos = (state = [], action) => {
	switch(action.type) {
		case "ADD_TODO":
			return [
				...state,
				todo()
			];
		case "TOGGLE_TODO":
			return state.map(t => todo(t));
		default:
			return state;
	}
}

const store = redux.createStore(todos);

console.log("Initial State");
console.log("---------------");
console.log(JSON.stringify(store.getState(),undefined, 2));
console.log("---------------\n");

console.log("Dispaching ADD_TODO.")
store.dispatch({
	type: "ADD_TODO",
	id: 0,
});
console.log("---------------\n");

console.log("Current State");
console.log("---------------");
console.log(JSON.stringify(store.getState(),undefined, 2));
console.log("---------------\n");

console.log("Dispaching ADD_TODO.")
store.dispatch({
	type: "ADD_TODO",
	id: 1,
	text: "Go Shopping"
});
console.log("---------------\n");

console.log("Current State");
console.log("---------------");
console.log(JSON.stringify(store.getState(),undefined, 2));
console.log("---------------\n");

console.log("Dispaching TOGGLE_TODO.")
store.dispatch({
	type: "TOGGLE_TODO",
	id: 0,
});
console.log("---------------\n");
