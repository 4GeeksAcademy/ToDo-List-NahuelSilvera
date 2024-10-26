import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faUndo } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/index.css"; 

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const maxChars = 25;

  // Función para agregar tareas
  const addTask = (element) => {
    if (element.key === "Enter" && newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  // Función para eliminar tareas
  const deleteTask = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  };

  // Función para comprobar que las tareas fueron completadas
  const checkTask = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Función para borrar todas las tareas
  const clearAllTasks = () => {
    setTasks([]);
  };

  // Función para confirmar la eliminación de todas las tareas
  const confirmClearTasks = () => {
    clearAllTasks();
    setIsModalOpen(false);
  };

  // Contar elementos restantes
  const remainingTasks = tasks.filter(task => !task.completed).length;

  return (
    <div
      id="backgroundPage"
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#2c3e50" }}
    >
      <div className="todo-container">
        <h1 className="todo-title">todos</h1>
        <input
          type="text"
          placeholder="¿Qué hacemos hoy?"
          value={newTask}
          onChange={(element) => setNewTask(element.target.value)}
          onKeyPress={addTask} 
          maxLength={maxChars}
          className="form-control mb-3"
        />
        <ul className="todo-list list-unstyled">
          {tasks.length === 0 ? (
            <li className="text-center">Cuanto vacío... 😲</li>
          ) : (
            tasks.map((task, index) => (
              <li key={index} className="d-flex justify-content-between align-items-center task-item">
                <span className={`task-text ${task.completed ? "completed" : ""}`}>
                  {task.text}
                </span>
                <div className="icon-container">
                  {task.completed ? (
                    <span className="check-icon hover-icon" onClick={() => checkTask(index)}>
                      <FontAwesomeIcon icon={faUndo} />
                    </span>
                  ) : (
                    <span className="check-icon hover-icon" onClick={() => checkTask(index)}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                  )}
                  <span className="delete-icon hover-icon" onClick={() => deleteTask(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </div>
              </li>
            ))
          )}
        </ul>
        <p>{remainingTasks} item{remainingTasks !== 1 ? "s" : ""} left</p>

        <button 
          className="btn btn-danger mt-3"
          style={{ display: tasks.length === 0 ? 'none' : 'block' }} // Ocultar el botón si no hay tareas
          data-bs-toggle="modal" 
          onClick={() => setIsModalOpen(true)} 
        >
          Borrar todo
        </button>

        {isModalOpen && (
          <>
            <div className="custom-backdrop"></div>
            <div className="modal fade show d-block" id="clearTasksModal" tabIndex="-1" aria-labelledby="clearTasksModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="clearTasksModalLabel">¿Estás seguro?</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setIsModalOpen(false)}></button>
                  </div>
                  <div className="modal-body">
                    Al confirmar eliminarás todas las tareas.
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setIsModalOpen(false)}>Cerrar</button>
                    <button type="button" className="btn btn-primary" onClick={confirmClearTasks}>
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;