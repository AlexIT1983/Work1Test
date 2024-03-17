// функция для обработки асинхронного запроса

import { deleteTodo } from "../api";
import { ACTION_TYPE } from "../actions";

export const deleteTodoAsync = (id) => (dispatch) => {
	dispatch({ type: ACTION_TYPE.LOAD_START });

	return deleteTodo(id)
		.then(() => {
			dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: id });
		})
		.finally(() => dispatch({ type: ACTION_TYPE.LOAD_END }));

	// .finally(() => setIsLoadingLabel(false));
};
