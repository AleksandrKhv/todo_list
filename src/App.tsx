import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy ', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Redux", isDone: true},
            {id: v1(), title: "CASS", isDone: true},
            {id: v1(), title: "MySQL", isDone: false},
            {id: v1(), title: "WorldPress", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
        ],
    })

    /* let [tasks, setTasks] = useState([
     { id: v1(), title: "HTML&CSS", isDone: true },
     { id: v1(), title: "JS", isDone: true },
     { id: v1(), title: "ReactJS", isDone: false },
     { id: v1(), title: "Rest API", isDone: false },
     { id: v1(), title: "GraphQL", isDone: false },
       ]);*/

    function removeTask(id: string, todoListId: string) {
        tasks[todoListId] = tasks[todoListId].filter(t => t.id !== id)
        setTasks({...tasks})
        /*let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);*/
    }

    function addTask(title: string, todoListId: string) {
        let newTasks = {id: v1(), title: title, isDone: false}
        const copyState = {...tasks}
        copyState[todoListId] = [newTasks, ...tasks[todoListId]]
        setTasks(copyState)
    }

    const changeStatus = (CurrentId: string, value: boolean, todoListId: string) => {
        const copyState = {...tasks}
        copyState[todoListId] = tasks[todoListId].map(m => m.id === CurrentId ? {...m, isDone: value} : m)
        setTasks(copyState)
        // setTasks(tasks.map(m => m.id === CurrentId ? {...m, isDone: value} : m))
    }

    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        const copyState = {...tasks}
        copyState[todoListId] = tasks[todoListId].map(m => m.id === taskId ? {...m, title: title} : m)
        setTasks(copyState)
        // setTasks(tasks.map(m => m.id === CurrentId ? {...m, isDone: value} : m))
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const upDateTodoList = todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl)
        setTodoLists(upDateTodoList)
    }

    function changeTodoListTitle(title: string, todoListId: string) {
        const upDateTodoList = todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl)
        setTodoLists(upDateTodoList)
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
    }

    const addTodoList = (title: string) => {
        const newTodo: TodoListType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodo])
        setTasks({...tasks, [newTodo.id]: []})
    }

    const todoListComponents = todoLists.map(tl => {
        let tasksForTodolist = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(tl => !tl.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(tl => tl.isDone);
        }
        return (
            <div className="App">
                <Todolist key={tl.id}
                          todoListId={tl.id}
                          title={tl.title}
                          tasks={tasksForTodolist}
                          removeTask={removeTask}
                          changeFilter={changeFilter}
                          addTask={addTask}
                          changeStatus={changeStatus}
                          filter={tl.filter}
                          removeTodoList={removeTodoList}
                          changeTaskTitle={changeTaskTitle}
                          changeTodoListTitle={changeTodoListTitle}
                />
            </div>
        );
    })

    return (
        <div className="App">
            {/*<button onClick={addTodoList}>add todolist</button>*/}
            <AddItemForm addItem={addTodoList}/>
            {todoListComponents}
        </div>
    )
}

export default App;
