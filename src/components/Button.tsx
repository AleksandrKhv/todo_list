import React from 'react';
import {FilterType} from '../App';

type propsType = {
    name: string
    callBack: ()=>void
}

const Button = (props: propsType) => {

const onClickHandler = () =>{
    props.callBack()
    }

    return (
        <div>
            <button onClick={onClickHandler}>{props.name}</button>
        </div>
    );
};

export default Button;