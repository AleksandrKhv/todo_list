import React from 'react';

type propsType = {
    title: string
    setTitle: (title: string) => void
    addTask: (title: string) => void
}

const Input = ({title, setTitle, addTask, ...props}: propsType) => {

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event:  React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask(title)
            setTitle('')
        }
    }
    return (
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
        </div>
    );
};

export default Input;