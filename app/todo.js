import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";

const todo = (state, action) => {
	switch(action.type) {
		case "ADD_TODO":
			return {
				id: action.id,
				text: action.text,
				completed: false
			};
		case "TOGGLE_TODO":
			if (todo.id === action.id) {
				return Object.assign({}, todo, {
					completed: !todo.completed
				});
			}
			return todo;
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
			return state.map(t => todo(t));
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

const todoApp = Redux.combineReducers({
	todos,
	visibilityFilter
});

const store = Redux.createStore(todoApp);

let nextTodoId = 0;
class TodoApp extends React.Component {
	render() {
		/*return <div>
			<button onClick={() => {
				store.dispatch({
					type: "ADD_TODO",
					text: "Test",
					id: nextTodoId++
				});
			}}></button>
			<ul>
				{
					this.props.todos.map(t => {
						<li key={t.id}>{store.getState().todos}</li>
					})
				}
			</ul>
		</div>;*/
		return <div>Hello World</div>;
	}
}

const render = () => {
	ReactDOM.render(<TodoApp />, document.querySelector(".root"));
};

store.subscribe(render);

render();
