import * as React from "react";
import * as ReactDOM from "react-dom";
import { store } from "./todo_reducer"

const getVisibleTodods = (todos, filter) => {
	switch(filter) {
		case "SHOW_ALL":
			return todos;
		case "SHOW_ACTIVE":
			return todos.filter(t => !t.completed);
		case "SHOW_COMPLETED":
			return todos.filter(t => t.completed);
	}
}

const Todo = ({onClick, completed, text}) => {
	return <li onClick={onClick} style={{textDecoration: completed ? "line-through": "none"}}>{text}</li>;
};

const TodoList = ({todos, onTodoClick}) => {
	return <ul>
		{
			todos.map(todo => {
				return <Todo
					key={todo.id}
					onClick={() => onTodoClick(todo.id)} completed={todo.completed} text={todo.text}></Todo>;
			})
		}
	</ul>
};

const AddTodo = ({onAddClick}) => {
	let input;
	return <div>
		<input ref={node => {
				input = node
			}}></input>
			<button onClick={() => {
				onAddClick(input.value);
				input.value = "";
			}}>Add Todo</button>
	</div>;
}

const Footer = ({visibilityFilter, onFilterClick}) => {
	return <p>
		Show: {' '}
		<FilterLink filter={"SHOW_ALL"} currentFilter={visibilityFilter} onClick={onFilterClick}>All</FilterLink>{' '}
		<FilterLink filter={"SHOW_ACTIVE"} currentFilter={visibilityFilter} onClick={onFilterClick}>Active</FilterLink>{' '}
		<FilterLink filter={"SHOW_COMPLETED"} currentFilter={visibilityFilter} onClick={onFilterClick}>Completed</FilterLink>
	</p>
}

let nextTodoId = 0;
const TodoApp = ({todos, visibilityFilter}) => {
	return <div>
		<AddTodo onAddClick={text => {
			store.dispatch({
				type: "ADD_TODO",
				text: text,
				id: nextTodoId++
			});
		}}></AddTodo>
		<TodoList todos={getVisibleTodods(todos, visibilityFilter)} onTodoClick={id => {
			store.dispatch({
				type: "TOGGLE_TODO",
				id
			})
		}}></TodoList>
		<Footer visibilityFilter={visibilityFilter} onFilterClick={filter => {
			store.dispatch({
				type: "SET_VISIBILITY_FILTER",
				filter
			})
		}}></Footer>
	</div>;
}

const FilterLink = ({filter, currentFilter, children, onClick}) => {
	if (currentFilter === filter) {
		return <span>{children}</span>
	}
	return <a href="#" onClick={e => {
		e.preventDefault();
		onClick(filter)
	}}>{children}</a>;
}

const render = () => {
	ReactDOM.render(
	<TodoApp {...store.getState()}/>,
	document.querySelector(".root"));
};

store.subscribe(render);

render();
