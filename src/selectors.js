// наши селекторы

export const selectTodos = ({ todos }) => todos;
export const selectSearchPhrase = ({ options }) => options.searchPhrase;
export const selectIsAlphabetSorting = ({ options }) =>
	options.isAlphabetSorting;
export const selectSearchInput = ({ options }) => options.searchInput;

export const selectEditingTodoId = ({ editingTodo }) => editingTodo.id;

export const selectEditingTodoTitle = ({ editingTodo }) => editingTodo.title;

export const selectIsLoading = ({ options }) => options.isLoading;
