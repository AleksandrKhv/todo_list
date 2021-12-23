import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './Todolist.module.css';
import {Button, IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';


type propsType = {
    addItem: (title: string) => void

}

const AddItemForm = (props: propsType) => {

    let [title, setTitle] = useState("")
    const [error, setError] = useState<boolean|string>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const addItem = () => {
        if (title.trim()) {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError('Title is required')
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
            <TextField variant={'outlined'}
                       size={'small'}
                // className={error ? styles.error : ''}
                       error={!!error}
                       helperText={error}
                       label={'Title'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
            {/*<input className={error ? styles.error : ''} value={title} onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>*/}
            {/*<Button onClick={addItem}
                    size={'small'}
                    variant={'contained'}
                    color={'primary'}
                    disableElevation>+</Button>*/}
            <IconButton onClick={addItem}
                        color={'primary'}
            >
                <AddBox fontSize={'small'}/>
            </IconButton>
            {/*{error && <div className={styles.errorMessage}>Title is required</div>}*/}
        </div>
    );
};

export default AddItemForm;