// File store redux

import { createStore } from "redux";
import { combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { todosReducer, editiongTodoReducer, optionsReducer } from "./reducers";

const reducer = combineReducers({
	todos: todosReducer,
	editingTodo: editiongTodoReducer,
	options: optionsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk)),
);
