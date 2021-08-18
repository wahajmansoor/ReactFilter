import React, { useState, useEffect } from 'react';
import "./style.css";

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
    if(lists) {
        return JSON.parse(lists);
    }
    else{
        return [];
    }
 }

const Todo = () => {
    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // Add Item
    const addItem =() =>{
        if (!inputdata){
            alert("Please fill the data");
        } 
        else if (inputdata && toggleButton){
            setItems(
                items.map((curElem) =>{
                    if(curElem.id === isEditItem){
                        return{...curElem, name: inputdata}
                    }
                    return curElem;
                })
            )
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        } 
        else {
            const myNewInputData ={
                id: new Date().getTime().toString(),
                name: inputdata,
            }
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    }

    //Edit Item
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    }

    // Delete Item
    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) =>{
            return curElem.id !== index;
        });
        setItems(updatedItems);
    }

    // Remove All 
    const removeAll =() => {
        setItems([]);
    }

    // Local Storage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="Logo"/>
                        <figcaption>
                            Add Your List Here 👏
                        </figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="Enter item here..." className="form-control" value={inputdata} onChange= {(event) => setInputData(event.target.value)}/>
                        {toggleButton ? (
                            <i className="fa fa-marker add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        )}
                        
                    </div>
                    {/* show items */}
                        <div className="showItems">
                            {
                                items.map((curElem) => {
                                   return(
                                    <div className="eachItem" key={curElem.id}>
                                        <h3>{curElem.name}</h3>
                                        <div className="todo-btn">
                                        <i className="fas fa-marker add-btn" onClick={() => editItem(curElem.id)}></i>
                                        <i className="fas fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                                        </div>
                                    </div>
                                   )         
                                })
                            }
                           
                        </div>
                    {/* remove items */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>Check List</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
