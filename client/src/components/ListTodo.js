import React from "react";
import { useEffect, useState } from "react";
import EditTodo from "./EditTodo.js";
const ListTodo = () => {
  const [todos, setTodos] = useState([]);
 //Delete todo funation
 const deleteTodo=async(id)=>{
    try {
        const deleteTodo=await fetch(`http://localhost:5000/todos/${id}`,{
        method:"DELETE",
        
    });
    setTodos(todos.filter(todo=>todo.todo_id!==id));
  
    } catch (error) {
        console.error(error.massage);
    }
 }
 //
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (error) {
      console.error(error.massage);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <table className="table table-striped mt-5 text-center">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td><EditTodo todo={todo}/></td>
                <td>
                  <button className="btn btn-danger" onClick={()=>deleteTodo(todo.todo_id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodo;
