import { createStore } from "redux";

const counter = (state = 0, action) => {
	switch(action.type) {
		case "INCREMENT":
			return state + 1;
		case "DECREMENT":
			return state - 1;
		default:
			return 0;
	}
}

const store = createStore(counter);

const render = () => {
	window.document.body.innerText = store.getState();	
};

store.subscribe(() => {
	render()
});

window.document.addEventListener("click", () => {
	store.dispatch({type: "INCREMENT"});
});

render();
