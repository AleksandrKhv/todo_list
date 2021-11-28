import React, {useState} from 'react';
import {FilterType} from './App';
import Button from './components/Button';
import Input from './components/Input';
import NewButton from './components/NewButton';


type TItem = {
    title: string
    tasks: Array<TTasks>
    removeTask: (mId: string) => void
    setFilter: (value: FilterType) => void
    addTask: (title: string) => void
}

type TTasks = {
    id: string
    title: string
    isDone: boolean
}


export const Todolist = (props: TItem) => {

    const [title, setTitle] = useState('')

        const onClickHandler = (mId: string) => {
            props.removeTask(mId)
        }

        const setFilterClickHandler = (value: FilterType) => {
            props.setFilter(value)
        }

        const callBackHandlerNewButton = () => {
            props.addTask(title)
            setTitle('')
        }

        return (
            <div>
                <h3>{props.title}</h3>
                <div>
                    {/*<FullInput addTask={props.addTask}/>*/}
                    <Input title={title} setTitle={setTitle} addTask={props.addTask}/>
                    <NewButton name={'xxx'} callBack={()=>callBackHandlerNewButton()}/>
                </div>
                <ul>
                    {props.tasks.map(m => <li key={m.id}>
                        <input type="checkbox" checked={m.isDone}/>
                        <span> {m.title}</span>
                        <Button name={'xx'} callBack={() => onClickHandler(m.id)}/>
                    </li>)}
                </ul>
                <div>
                    <Button name={'All'} callBack={() => setFilterClickHandler('All')}/>
                    <Button name={'Active'} callBack={() => setFilterClickHandler('Active')}/>
                    <Button name={'Completed'} callBack={() => setFilterClickHandler('Completed')}/>
                </div>
            </div>
        );
    }
;