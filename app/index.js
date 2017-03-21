import { createStore } from "redux";

const counter = (state = 0, action) => {
	switch(action.type) {
		case "INCREMENT":
			return start + 1;
		case "DECREMENT":
			return start - 1;
		default:
			return 0;
	}
}

const store = createStore(counter);

