// функция для обработки асинхронного запроса

import { updateTodo } from "../api";
import { ACTION_TYPE } from "../actions";

export const updateTodoAsync = (newTodoData) => (dispatch) => {
	dispatch({ type: ACTION_TYPE.LOAD_START });

	return updateTodo(newTodoData)
		.then(() => {
			dispatch({ type: ACTION_TYPE.UPDATE_TODO, payload: newTodoData });
		})
		.finally(() => dispatch({ type: ACTION_TYPE.LOAD_END }));

	// .finally(() => setIsLoadingLabel(false));
};
