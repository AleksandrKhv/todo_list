import {TaskStateType} from '../AppWithRedux';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

export type RuleActionType =
    RemoveTaskType
    | AddTaskType
    | ChangeTaskTitleType
    | ChangeTaskStatusType
    | AddTodolistActionType
    | RemoveTodolistActionType

type RemoveTaskType = ReturnType<typeof removeTaskAC>

type AddTaskType = ReturnType<typeof addTaskAC>

type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

type ChangeTaskStatusType = ReturnType<typeof changeStatusTitleAC>

const initialState: TaskStateType = {}

export const tasksReducer = (tasks: TaskStateType = initialState, action: RuleActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            /*const tasksCopy = {...tasks}
            const task = tasks[action.todoListId]
            const filteredTasks = task.filter(t => t.id !== action.tasksId)
            tasksCopy[action.todoListId] = filteredTasks
            return tasksCopy*/
            return {...tasks, [action.todoListId]: tasks[action.todoListId].filter(t => t.id !== action.tasksId)}
        case 'ADD-TASK':
            return {
                ...tasks,
                [action.todoListId]: [{id: v1(), title: action.title, isDone: false}, ...tasks[action.todoListId]]
            }
        case 'CHANGE-STATUS-TASK':
            return {
                ...tasks, [action.todoListId]: tasks[action.todoListId]
                    .map(m => m.id === action.CurrentId ? {...m, isDone: action.value} : m)
            }
        case 'CHANGE-TASK-TITLE':
// return {...tasks,[action.todoListId]: tasks[action.todoListId].map(m => m.id === action.taskId ? {...m, title: action.title} : m) }
            let copyTasks = {...tasks}
            copyTasks[action.todoListId] = tasks[action.todoListId].map(m => m.id === action.taskId ? {
                ...m,
                title: action.title
            } : m)
            return copyTasks
        case 'ADD-TODOLIST': {
            return {...tasks, [action.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...tasks}
            delete copyState[action.id]
            return copyState
        }
        default :
            return tasks
    }
}

export const removeTaskAC = (tasksId: string, todoListId: string) => {
    return {type: 'REMOVE-TASK', tasksId: tasksId, todoListId: todoListId} as const
}
export const addTaskAC = (title: string, todoListId: string) => {
    return {type: 'ADD-TASK', title: title, todoListId: todoListId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId: taskId, title: title, todoListId: todoListId} as const
}
export const changeStatusTitleAC = (CurrentId: string, value: boolean, todoListId: string) => {
    return {type: 'CHANGE-STATUS-TASK', CurrentId: CurrentId, value: value, todoListId: todoListId} as const
}
