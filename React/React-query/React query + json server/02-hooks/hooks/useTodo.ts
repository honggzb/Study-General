// https://github.com/Afaisal94/react-query-json-server/

import axios from "axios"

const getTodos = async() => {
    const response = await axios.get("http://localhost:5000/todos")
    return response.data
}

const getTodoById = async(id) => {
    const response = await axios.get(`http://localhost:5000/todos/${id}`)
    return response.data
}

const getTodosPaging = async({page, limit}) => {
    const response = await axios.get(`http://localhost:5000/todos?_page=${page}&_limit=${limit}`)
    return response
}

const getTodosInfinite = async({pageParam = 1}) => {
    const response = await axios.get(`http://localhost:5000/todos?_page=${pageParam}&_limit=2`)
    return response
}

const createTodo = async({title}) => {
    const response = await axios.post("http://localhost:5000/todos", {title})
    return response.data
}

const updateTodo = async({id, title}) => {
    const response = await axios.patch(`http://localhost:5000/todos/${id}`, {title})
    return response.data
}

const deleteTodo = async(id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`)
    return id
}

const totalData = async() => {
    const response = await axios.get("http://localhost:5000/todos");
    return response.data.length;
}

export { getTodos, getTodoById, getTodosPaging, createTodo, updateTodo, deleteTodo, totalData, getTodosInfinite }