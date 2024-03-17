// функция для обработки асинхронного запроса

import { createTodo } from "../api";
import { ACTION_TYPE } from "../actions";
import { NEW_TODO_ID } from "../constants";

export const createTodoAsync = (newTodoData) => (dispatch) => {
	dispatch({ type: ACTION_TYPE.LOAD_START });

	return createTodo(newTodoData)
		.then((todo) => {
			dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: NEW_TODO_ID });
			dispatch({ type: ACTION_TYPE.ADD_TODO, payload: todo });
		})
		.finally(() => dispatch({ type: ACTION_TYPE.LOAD_END }));

	// .finally(() => setIsLoadingLabel(false));
};
