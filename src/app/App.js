// Компонент app

import { useEffect, useState } from "react";
import { Todo, ControlPanel } from "../components";

import {
	selectIsAlphabetSorting,
	selectSearchPhrase,
	selectTodos,
} from "../selectors";
import { useSelector, useDispatch } from "react-redux";
import { readTodosAsync } from "../actions";
import styles from "./App.module.css";

export const App = () => {
	const todos = useSelector(selectTodos);
	const isAlphabetSorting = useSelector(selectIsAlphabetSorting);
	const searchPhrase = useSelector(selectSearchPhrase);

	const dispatch = useDispatch();

	const [isLoadingLabel, setIsLoadingLabel] = useState(false);

	useEffect(() => {
		setIsLoadingLabel(true);
		dispatch(readTodosAsync(searchPhrase, isAlphabetSorting));

		setTimeout(() => setIsLoadingLabel(false), 500);
	}, [searchPhrase, isAlphabetSorting]);

	return (
		<div className={styles.app}>
			<ControlPanel />
			<div>
				{isLoadingLabel ? (
					<div className={styles.loadingLabel}></div>
				) : (
					todos.map(({ id, title, completed }) => (
						<Todo
							key={id}
							id={id}
							title={title}
							completed={completed}
						/>
					))
				)}
			</div>
		</div>
	);
};
