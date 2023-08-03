import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { todosService } from "../services/TodosService.js";

export class TodosController extends BaseController {
  constructor() {
    super('api/todos')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllTodos)
      .post('', this.createTodos)
      .put('/:todoId', this.editTodo)
      .delete('/:todoId', this.deleteTodo)
  }

  async getAllTodos(request, response, next) {
    try {
      request.query.creatorId = request.userInfo.id
      const todos = await todosService.getAllTodos(request.query)
      return response.send(todos)
    } catch (error) {
      next(error)
    }
  }

  async createTodos(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newTodo = await todosService.createTodo(req.body)
      return res.send(newTodo)
    } catch (error) {
      next(error)
    }
  }

  async editTodo(req, res, next) {
    try {
      req.body.todoId = req.params.todoId
      const updateTodo = await todosService.editTodo(req.body)
      return res.send(updateTodo)
    } catch (error) {
      next(error)
    }
  }

  async deleteTodo(req, res, next) {
    try {
      const todoId = req.params.todoId
      await todosService.deleteTodo(todoId)
      return res.send('This todo has been deleted')
    } catch (error) {
      next(error)
    }
  }
}