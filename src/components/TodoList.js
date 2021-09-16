import { useEffect, useState } from "react";
import "../styles/TodoList.css";
import AddTodoForm from "./AddTodoForm";
import { db } from "../firebase";
import PropTypes from "prop-types";

const TodoList = ({ userId }) => {
    const [todos, setTodos] = useState(null);
    const [completed, setCompleted] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        console.log("useEffect TodoList (en cada renderizado)");
    }); // se ejecuta en cada renderizado del componente

    useEffect(() => {
        console.log("useEffect TodoList (solo cuando se monta)");
    }, []); // si la lista de dependencias es vacía ([]) se ejecuta solo cuando se monta el componente

    useEffect(() => {
        console.log("useEffect TodoList (completed)");
    }, [completed]); // se ejecuta solo cuando se actualiza la variable de estado "completed"

    useEffect(() => {
        console.log("useEffect TodoList (completed, todo)");
        if (todos && todos.length > 0) {
            document.title = `Tienes ${todos.length} tareas pendientes`;
        } else {
            document.title = "No tienes tareas pendientes";
        }
    }, [todos]); // se ejecuta solo cuando se actualiza la variable de estado "completed" y "todos"

    useEffect(() => {
        if (darkMode) {
            console.log("DARK");
        } else {
            console.log("LIGHT");
        }
    }, [darkMode]);

    useEffect(() => {
        console.log("SE MONTO EL COMPONENTE");
        window.addEventListener("resize", handleResize);

        return () => {
            console.log("SE DESMONTO EL COMPONENTE");
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Lectura de datos una sola vez al montar el componente
    // useEffect(() => {
    //   const getTodos = async () => {
    //     // const todoList = snapshot.val();
    //     // console.log("todoList", todoList);
    //
    //     const initialTodosList = [];
    //     const snapshot = await db.ref("todos").once("value");
    //     snapshot.forEach((childSnapshot) => {
    //       const todoId = childSnapshot.key;
    //       const todoData = childSnapshot.val();
    //       console.log("todoId", todoId);
    //       console.log("todoData", todoData);
    //
    //       initialTodosList.push(todoData);
    //     });
    //     setTodos(initialTodosList);
    //   };
    //
    //   getTodos();
    // }, []);

    // Suscribirnos a los cambios que ocurran en la base de datos
    useEffect(() => {
        db.ref(`todos/${userId}`).on("value", (snapshot) => {
            const initialTodosList = [];
            console.log("snapshot", snapshot.val());
            snapshot.forEach((childSnapshot) => {
                const todoId = childSnapshot.key;
                const todoData = childSnapshot.val();
                console.log("todoId", todoId);
                console.log("todoData", todoData);

                initialTodosList.push(todoData);
            });
            setTodos(initialTodosList);
        });

        return () => {
            db.ref("todos").off();
        };
    }, []);

    const handleResize = () => {
        console.log("handleResize", window.innerWidth);
        setWindowWidth(window.innerWidth);
    };

    // const handleAddTask = (newTodo) => {
    //   setTodos((prevState) => [...prevState, newTodo]);
    // };

    const handleDeleteTask = (positionToDelete) => {
        const newTodos = todos.filter(
            (todo, taskPosition) => taskPosition !== positionToDelete
        );
        setTodos(newTodos);
    };

    const handleCompleteTask = (positionToComplete) => {
        const taskToComplete = todos[positionToComplete];
        handleDeleteTask(positionToComplete);
        setCompleted((prevState) => [...prevState, taskToComplete]);
    };

    const handleSetDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={darkMode ? "dark-mode" : ""}>
            <button onClick={handleSetDarkMode}>
                {darkMode ? "Desactivar" : "Activar"} modo oscuro
            </button>
            <h1>Lista de tareas</h1>

            <AddTodoForm userId={userId} />

            <div>
                <h3>Tareas pendientes</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Eliminar</th>
                        <th>Completada</th>
                    </tr>
                    </thead>
                    <tbody>
                    {todos === null
                        ? "Consultado tareas..."
                        : todos.length === 0
                            ? "No existen tareas pendientes."
                            : todos.map((todo, index) => (
                                <tr key={todo.id}>
                                    <td>{todo.title}</td>
                                    <td>
                                        <button onClick={() => handleDeleteTask(index)}>
                                            Eliminar
                                        </button>
                                    </td>

                                    <td>
                                        <button onClick={() => handleCompleteTask(index)}>
                                            Marcar como Completada
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h3>Tareas completadas</h3>

                <ul>
                    {completed.map((task, index) => (
                        <li key={index}>{task}</li>
                    ))}
                </ul>
            </div>

            <h1>Ancho de la ventana: {windowWidth}</h1>
        </div>
    );
};

TodoList.propTypes = {
    userId: PropTypes.string,
};

export default TodoList;