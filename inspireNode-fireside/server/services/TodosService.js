import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class TodosService {
  async getAllTodos(query) {
    const todos = await dbContext.Todos.find(query)
    return todos
  }

  async createTodo(body) {
    const newTodo = await dbContext.Todos.create(body)
    return newTodo
  }

  async editTodo(body) {
    const updateTodo = await dbContext.Todos.findById(body.todoId)
    if (!updateTodo) {
      throw new BadRequest('No todo at this id')
    }
    updateTodo.description = body.description ? body.description : updateTodo.description
    updateTodo.completed = body.completed ? body.completed : updateTodo.completed
    // updateTodo.description = body.description || updateTodo.description
    // updateTodo.completed = body.completed !== null ? body.completed : updateTodo.completed
    await updateTodo.save()
    return updateTodo
  }

  async deleteTodo(todoId) {
    const todo = await dbContext.Todos.findById(todoId)
    if (!todo) {
      throw new BadRequest('This todo does not exist.')
    }
    await todo.delete()
  }
}

export const todosService = new TodosService();