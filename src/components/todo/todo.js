// Компонент для вывода задач и обработки задач

import styles from "./todo.module.css";
import {
	selectIsLoading,
	selectEditingTodoId,
	selectEditingTodoTitle,
} from "../../selectors";
import { Button } from "../button/button";
import { NEW_TODO_ID, KEYBOARD } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
	ACTION_TYPE,
	updateTodoAsync,
	createTodoAsync,
	deleteTodoAsync,
} from "../../actions";

export const Todo = ({ id, title, completed }) => {
	const editingTodoId = useSelector(selectEditingTodoId);
	const editingTodoTitle = useSelector(selectEditingTodoTitle);
	const isLoading = useSelector(selectIsLoading);

	const dispatch = useDispatch();

	const isEditing = id === editingTodoId;

	const onEdit = () => {
		dispatch({ type: ACTION_TYPE.EDIT_TODO, payload: { id, title } });

		if (id !== NEW_TODO_ID) {
			dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: NEW_TODO_ID });
		}
	};

	const onTitleChange = ({ target }) => {
		dispatch({
			type: ACTION_TYPE.EDIT_TODO,
			payload: { title: target.value },
		});
	};

	const onCompletedChange = ({ target: { checked } }) => {
		dispatch(updateTodoAsync({ id, completed: checked }));
	};

	const onNewTodoSave = () => {
		if (editingTodoTitle.trim() === "") {
			dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: id });

			return;
		}

		dispatch(createTodoAsync({ title: editingTodoTitle, completed }));
	};

	const onEditingTodoSave = () => {
		if (editingTodoTitle.trim() === "") {
			onRemove();
			return;
		}

		dispatch(updateTodoAsync({ id, title: editingTodoTitle })).then(() => {
			dispatch({
				type: ACTION_TYPE.EDIT_TODO,
				payload: { id: null },
			});
		});
	};

	const onSave = () => {
		if (id === NEW_TODO_ID) {
			onNewTodoSave();
		} else {
			onEditingTodoSave();
		}
	};

	const onRemove = () => {
		dispatch(deleteTodoAsync(id));
	};

	const onKeyDown = ({ key }) => {
		if (key === KEYBOARD.ENTER) {
			onSave();
		} else if (key === KEYBOARD.ESCAPE) {
			dispatch({
				type: ACTION_TYPE.EDIT_TODO,
				payload: { id: null },
			});

			if (id === NEW_TODO_ID) {
				dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: id });
			}
		}
	};

	return (
		<div key={id} className={styles.todo}>
			<input
				className={styles.checkbox2}
				type="checkbox"
				disabled={isEditing || isLoading}
				checked={completed}
				onChange={onCompletedChange}
			/>
			№: {id}.
			<div className={styles.todoTitle}>
				{isEditing ? (
					<input
						type="text"
						disabled={isLoading}
						autoFocus={true}
						value={editingTodoTitle}
						onKeyDown={onKeyDown}
						onChange={onTitleChange}
					/>
				) : (
					<div onClick={onEdit}>{title}</div>
				)}
			</div>
			: Статус задачи:
			{completed ? " Завершена" : " Надо завершить"}
			<div>
				{isEditing ? (
					<Button onClick={onSave}>✎</Button>
				) : (
					<Button onClick={onRemove}>✖</Button>
				)}
			</div>
		</div>
	);
};
