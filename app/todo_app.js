import * as React from "react";
import * as ReactDOM from "react-dom";
import { store as gStore} from "./todo_reducer"

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

let nextTodoId = 0;
const TodoApp = ({ store }) => {
	return <div>
		<AddTodo store={store}></AddTodo>
		<VisibleTodoList store={store}></VisibleTodoList>
		<Footer store={store}></Footer>
	</div>;
}

const AddTodo = ({ store }) => {
	let input;
	return <div>
		<input ref={node => {
				input = node
			}}></input>
			<button onClick={() => {
				store.dispatch({
					type: "ADD_TODO",
					text: input.value,
					id: nextTodoId++
				});
				input.value = "";
			}}>Add Todo</button>
	</div>;
}

class VisibleTodoList extends React.Component {
	componentDidMount() {
		const { store } = this.props;
		this.unsubscribe = store.subscribe(() => {
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		const { store } = this.props;
		const props = this.props;
		const state = store.getState();

		return <TodoList
			todos={getVisibleTodods(state.todos, state.visibilityFilter)}
			onTodoClick={id => {
				store.dispatch({
					type: "TOGGLE_TODO",
					id
				});
			}}
		></TodoList>;
	}
}

const TodoList = ({todos, onTodoClick}) => {
	return <ul>
		{
			todos.map(todo => {
				return <Todo
					key={todo.id}
					onClick={() => onTodoClick(todo.id)} completed={todo.completed} text={todo.text}></Todo>;
			})
		}
	</ul>;
};

const Todo = ({onClick, completed, text}) => {
	return <li onClick={onClick} style={{textDecoration: completed ? "line-through": "none"}}>{text}</li>;
};

const Footer = ({ store }) => {
	return <p>
		Show: {' '}
		<FilterLink store={store} filter={"SHOW_ALL"}>All</FilterLink>{' '}
		<FilterLink store={store} filter={"SHOW_ACTIVE"}>Active</FilterLink>{' '}
		<FilterLink store={store} filter={"SHOW_COMPLETED"}>Completed</FilterLink>
	</p>;
}

class FilterLink extends React.Component {
	componentDidMount() {
		const { store } = this.props;
		this.unsubscribe = store.subscribe(() => {
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		const { store } = this.props;
		const props = this.props;
		const state = store.getState();

		return <Link
			active={ props.filter === state.visibilityFilter }
			onClick = { () => {
				store.dispatch({
					type: "SET_VISIBILITY_FILTER",
					filter: props.filter
				});
			}}
		>{props.children}</Link>;
	}
}

const Link = ({active, children, onClick}) => {
	if (active) {
		return <span>{children}</span>
	}
	return <a href="#" onClick={e => {
		e.preventDefault();
		onClick();
	}}>{children}</a>;
}

ReactDOM.render( <TodoApp store={gStore}/>, document.querySelector(".root"));
