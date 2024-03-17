// компонент поиск

import { useRef } from "react";
import { debounce } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import styles from "./search.module.css";
import { selectSearchInput } from "../../../../selectors";
import { ACTION_TYPE } from "../../../../actions";

export const Search = () => {
	const dispatch = useDispatch();
	const searchInput = useSelector(selectSearchInput);

	const runSearch = (phrase) => {
		dispatch({ type: ACTION_TYPE.SET_SEARCH_PHRASE, payload: phrase });
	};

	const debouncedRunSearch = useRef(debounce(runSearch, 1600)).current;

	const onChange = ({ target }) => {
		dispatch({ type: ACTION_TYPE.SET_SEARCH_INPUT, payload: target.value });

		debouncedRunSearch(target.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		runSearch(searchInput);
	};

	return (
		<form className={styles.search} onSubmit={onSubmit}>
			<input
				className={styles.input}
				type="text"
				value={searchInput}
				placeholder="Поиск.."
				onChange={onChange}
			/>
		</form>
	);
};
