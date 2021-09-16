import React from "react";
import TodoList from "../components/TodoList";
import PropTypes from "prop-types";

const TodosPage = ({ userId }) => {
    return <TodoList userId={userId} />;
};

TodosPage.propTypes = {
    userId: PropTypes.string,
};

export default TodosPage;