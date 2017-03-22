// import { createStore } from "redux";
const createStore = require("redux").createStore;

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
			return state;
	}
};

const todos = (state = [], action) => {
	switch(action.type) {
		case "ADD_TODO":
			return [
				...state,
				todo(undefined, action)
			];
		case "TOGGLE_TODO":
			return state.map(t => todo(t, action));
		default:
			return state;
	}
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
	switch(action.type) {
		case "SET_VISIBILITY_FILTER":
			return action.filter;
		default:
		return state;
	}
};

const todoApp = (state = {}, action) => {
	return {
		todos: todos(
			state.todos,
			action
		),
		visibilityFilter: visibilityFilter(
			state.visibilityFilter,
			action
		)
	};
}

const store = createStore(todoApp);

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

console.log("Current State");
console.log("---------------");
console.log(JSON.stringify(store.getState(),undefined, 2));
console.log("---------------\n");

console.log("Dispaching SET_VISIBILITY_FILTER.")
store.dispatch({
	type: "SET_VISIBILITY_FILTER",
	filter: "SHOW_COMPLETED"
});
console.log("---------------\n");

console.log("Current State");
console.log("---------------");
console.log(JSON.stringify(store.getState(),undefined, 2));
console.log("---------------\n");

console.log("Dispaching SET_VISIBILITY_FILTER.")
store.dispatch({
	type: "SET_VISIBILITY_FILTER",
	filter: "SHOW_NOT_COMPLETED"
});
console.log("---------------\n");

console.log("Current State");
console.log("---------------");
console.log(JSON.stringify(store.getState(),undefined, 2));
console.log("---------------\n");
