import { useState, useRef, useEffect } from "react";
import api from "../../services/api";

import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

import "./style.css";

function Home() {

    const [todos, setTodos] = useState([])

    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [editTodoId, setEditTodoId] = useState(null)
    const [isFormOpen, setIsFormOpen] = useState(false)

    const inputTitle = useRef()
    const inputDescription = useRef()
    const inputPriority = useRef()
    const onChangeTitle = useRef()
    const onChangeDescription = useRef()
    const onChangePriority= useRef()

    async function getTodos() {
      const todosFromApi = await api.get("/todos")
      setTodos(todosFromApi.data)
    } 

    async function registerTodo() {
        const title = inputTitle.current.value.trim();
        const description = inputDescription.current.value.trim();

        if (!title || !description || !inputPriority.current.value) {
            alert("Preencha todos os campos")
            return
        }

        await api.post("/todos", {
          title: inputTitle.current.value,
          description: inputDescription.current.value,
          priority: inputPriority.current.value
        })

        inputTitle.current.value = ""
        inputDescription.current.value = ""
        inputPriority.current.value = ""
        getTodos()
    }

    async function toggleDone(id) {
      if(!isEditFormOpen) {
        const todo = todos.find(todo => todo.id === id);
        await api.put("/todos", {
          ...todo,
          done: !todo.done
        });
        getTodos();
      }
    }

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen)
    }

    async function deleteTodo(id) {
      await api.delete(`todos/${id}`)
      getTodos()
    }  

    const openEditForm = (id) => {
      setIsEditFormOpen(true)
      setEditTodoId(id)
    }

    const closeEditForm = () => {
      setIsEditFormOpen(false)
      setEditTodoId(null)
    }

    const cancelEdit = () => {
      closeEditForm()
      onChangeTitle.current.value = ""
      onChangeDescription.current.value = ""
      onChangePriority.current.value = ""
    }

    async function saveEdit(id) {
      const todo = todos.find(todo => todo.id === id)
      await api.put("/todos", {
        ...todo,
        title: onChangeTitle.current.value,
        description: onChangeDescription.current.value,
        priority: onChangePriority.current.value
      })
      getTodos()
      closeEditForm()
    }

    useEffect(() => {
      getTodos();
    }, [])

  return (
    <div className="home">
      <div className="header">
        <h1>TO DO LIST</h1>
        <button onClick={toggleForm}>
          <FaPlus className={`plus ${isFormOpen ? 'rotate' : ''}`}  />
        </button>
      </div>
      <div className={`todo-form ${isFormOpen ? '' : 'hidden'}`}>
        <input type="text" placeholder="Titulo" ref={inputTitle} />
        <input type="text" placeholder="Descrição" ref={inputDescription} />
        <input type="number" min={1} max={10} placeholder="Prioridade(1-10)" ref={inputPriority} />
        <button onClick={registerTodo}>Adicionar</button>
      </div>
      <div className="todo-cards">
        {todos.map(todo => (
          <div key={todo.id} className={`todo-card ${todo.done ? 'feito' : ''}`} onClick={async () => await toggleDone(todo.id)}>
            <div className={`todo-informations ${isEditFormOpen && todo.id === editTodoId ? 'hidden' : ''}`}>
              <h2 className="title">{todo.title}</h2>
              <p className="description">{todo.description}</p>
              <p className="priority">prioridade: {todo.priority}</p>
              <button className="edit" onClick={(e) => {e.stopPropagation();openEditForm(todo.id)}}><AiFillEdit /></button>
              <button className="trash" onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}><FaTrash /></button>
            </div>
            {isEditFormOpen && editTodoId === todo.id && (
              <div className="edit-form">
                <input className="title"
                  type="text"
                  defaultValue={todo.title}
                  ref={onChangeTitle}
                />
                <input className="description"
                  type="text"
                  defaultValue={todo.description}
                  ref={onChangeDescription}
                />
                <div className="priority-edit">
                  <p className="priority">prioridade: </p>
                  <input className="priority"
                    type="number"
                    min={1}
                    max={10}
                    defaultValue={todo.priority}
                    ref={onChangePriority}
                  />
                </div>
                <button onClick={(e) => {e.stopPropagation(); saveEdit(todo.id)}}>Salvar</button>
                <button onClick={(e) => {e.stopPropagation(); cancelEdit()}}>Cancelar</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;