import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './Todolist.module.css';

type propsType = {
    addItem: (title:string) => void

}

const AddItemForm = (props: propsType ) => {

    let [title, setTitle] = useState("")
    const [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const addItem = () => {
        if (title.trim()) {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError(true)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem();
            setError(false)
        }
    }

    return (
        <div>
            <input className={error ? styles.error : ''} value={title} onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={addItem}>+</button>
            {error && <div className={styles.errorMessage}>Title is required</div>}
        </div>
    );
};

export default AddItemForm;