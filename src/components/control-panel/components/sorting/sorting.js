// функция сортировки

import { Button } from "../../../button/button";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAlphabetSorting } from "../../../../selectors";
import { ACTION_TYPE } from "../../../../actions";
import styles from "./sorting.module.css";

export const Sorting = () => {
	const dispatch = useDispatch();
	const isAlphabetSorting = useSelector(selectIsAlphabetSorting);

	const onChange = ({ target }) => {
		dispatch({
			type: ACTION_TYPE.SET_IS_ALPHABET_SORTING,
			payload: target.checked,
		});
	};
	return (
		<Button>
			<input
				className={styles.checkbox}
				id="sorting-button"
				type="checkbox"
				checked={isAlphabetSorting}
				onChange={onChange}
			/>
			<label className={styles.label} htmlFor="sorting-button">
				A&darr;
			</label>
		</Button>
	);
};
