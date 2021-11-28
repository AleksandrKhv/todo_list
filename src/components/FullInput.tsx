import React, {useState} from 'react';


type propsType = {
    addTask: (title: string) => void
}

const FullInput = ({addTask, ...props}: propsType) => {

    const [title, setTitle] = useState('')

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter')
            addTaskHandler()
    }
    const addTaskHandler = () => {
        addTask(title)
        setTitle('')
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTaskHandler}>+</button>
        </div>
    );
};

export default FullInput;