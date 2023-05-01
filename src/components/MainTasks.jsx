import React, {useEffect, useState} from 'react';
import Container from "./Container";
import '../styles/MainTasks.css'
import axios from "axios";
const MainTasks = (props) => {
    const [task, setTask] = useState('')
    const [priority, setPriority] = useState('')
    const [createShown, setCreateShown] = useState(false)
    const [tasks, setTasks] = useState([])

    const token = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        axios
            .get(`https://task-euo4.onrender.com/auth/${token}`)
            .then((res) => {
                setTasks(res.data.tasks)
                console.log(res.data.tasks)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [setTasks, token])

    const handleRemove = (taskId) => {
        axios
            .delete(`https://task-euo4.onrender.com/task/delete/${token}/${taskId}`)
            .then((res) => {
                setTasks(res.data.tasks);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleUpdate = (taskId) => {
        axios
            .patch(`https://task-euo4.onrender.com/task/change/${token}/${taskId}`)
            .then((res) => {
                setTasks(res.data.tasks);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleShowCreate = () => {
        setCreateShown(!createShown)
    }

    const handleCreate = () => {
        if(task !== '' && priority !== ''){
            axios
                .post(`https://task-euo4.onrender.com/task/create/${token}`,
                    {
                        task: task,
                        priority: priority,
                        done: false
                    })
                .then((res) => {
                    setTasks(res.data.tasks);
                })
                .catch((err) => {
                    console.log(err)
                })

            setTask('')
            setPriority('')
        }
    }

    return (
        <div>
            <Container>
                <div className="main__tasks">
                    <div className="task__info">

                    </div>
                    <div className="task__info" id={'to__do'}>
                        <h2>To-do list</h2>
                        {tasks.length >= 1 ? (
                            tasks.map((listItem) => {
                                return (
                                    <div className="info__task">
                                        <div className="task__wrapper">
                                            <input
                                                type="checkbox"
                                                onChange={() => {handleUpdate(listItem.id)}}
                                                checked={listItem.done}
                                            />
                                            <p
                                                style={{
                                                    textDecoration: listItem.done ? "line-through" : "none",
                                                    opacity: listItem.done ? "0.6" : "1",
                                                }}
                                            >
                                                {listItem.task}
                                            </p>
                                        </div>
                                        <div className="additional">
                                            <span className={listItem.priority}>{listItem.priority}</span>
                                            <button className={'removeButton'} onClick={() => {handleRemove(listItem.id)}}></button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div>
                                <p>Here is no task yet...</p>
                            </div>
                        )}
                        {
                            createShown ? (
                                <div className="info__task">
                                    <input type="text" value={task} onInput={(e) => {setTask(e.target.value)}}/>
                                    <div className="additional">
                                        <select value={priority} onChange={(e) => {setPriority(e.target.value)}}>
                                            <option value="" hidden>Select priority</option>
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                        <button className={'buttonCreate'} onClick={handleCreate}>Create</button>
                                    </div>
                                </div>
                            ) : null
                        }
                        <div className="create__task">
                            <button
                                onClick={handleShowCreate}
                            >
                                {createShown ? 'Cancel' : 'Create task'}
                            </button>
                        </div>
                    </div>
                    <div className="task__info" id={'priority'}>
                        <h3 className="current__priority">current priorities</h3>
                        <ul>
                        {
                            tasks.map((listItem) => {
                                if(listItem.priority === 'high' && listItem.done !== true){
                                    return <li>{listItem.task}</li>;
                                } else {
                                    return null;
                                }
                            })
                        }
                        </ul>
                    </div>
                </div>
                <hr/>
            </Container>
        </div>
    );
};

export default MainTasks;