import { createStore } from "redux";
import * as React from "react";
import * as ReactDOM from "react-dom";

const counter = (state = 0, action) => {
	switch(action.type) {
		case "INCREMENT":
			return state + 1;
		case "DECREMENT":
			return state - 1;
		default:
			return state;
	}
}

const Counter = ({ value, onIncrement, onDecrement }) => {
	return <div>
		<h1>{value}</h1>
		<button onClick={onIncrement}>+</button>
		<button onClick={onDecrement}>-</button>
	</div>;
}

const store = createStore(counter);
const render = () => {
	ReactDOM.render(
	<Counter
		value={store.getState()}
		onIncrement={() => {
			store.dispatch({type: "INCREMENT"})
		}}
		onDecrement={() => {
			store.dispatch({type: "DECREMENT"})
		}}/>,
	document.querySelector(".root"));
};

store.subscribe(render);

render();
