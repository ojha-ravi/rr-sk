const expect = require("expect");
const deepFreeze = require("deep-freeze");

const toggleTodo = (todo) => {
	// todo.completed = !todo.completed;
	// return todo;

	// return {
	// 	id: todo.id,
	// 	text: todo.text,
	// 	completed: !todo.completed
	// };

	return Object.assign({}, todo, {
		completed: !todo.completed
	});

	// return {
	// 	...todo,
	// 	completed: !todo.completed
	// }	es7 (proposed), preset-state-2 (babel)
};

const testToggleTodo = () => {
	const todoBefore = {
		id: 0,
		text: "Lear Redux",
		completed: false
	};

	const todoAfter = {
		id: 0,
		text: "Lear Redux",
		completed: true
	};

	deepFreeze(todoBefore);

	expect(
		toggleTodo(todoBefore)
	).toEqual(todoAfter);
};

testToggleTodo();
