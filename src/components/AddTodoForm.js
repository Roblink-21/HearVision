import React, { useRef } from "react";
import PropTypes from "prop-types";
import { db } from "../firebase";

const AddTodoForm = ({ userId }) => {
    const inputRef = useRef(null);

    const handleAddTask = async () => {
        try {
            const newTodo = inputRef.current.value;

            // guardar en firebase
            const todosListRef = db.ref(`todos/${userId}`);
            const newTodoRef = todosListRef.push();
            console.log("newTodoRef", newTodoRef.key);
            await newTodoRef.set({
                id: newTodoRef.key,
                title: newTodo,
            });
            inputRef.current.value = "";
            // onAddTask(newTodo);
        } catch (e) {
            console.log("e", e);
        }
    };

    return (
        <div>
            <label htmlFor="todo">Nombre de la tarea</label>
            <input type="text" id="todo" ref={inputRef} />

            <button onClick={handleAddTask}>Agregar tarea</button>
        </div>
    );
};

AddTodoForm.propTypes = {
    onAddTask: PropTypes.func,
};

AddTodoForm.propTypes = {
    userId: PropTypes.string,
};

export default AddTodoForm;