import {useState} from 'react';
import WarningPopUp from './WarningPopUp';
import axios from 'axios';
import qs from 'qs';
function TaskContent(props){
    //state for checking task completed or not
    const [taskCompleted,setTaskCompleted]=useState(false);
    const [updateBox,setUpdateBox]=useState(false);
    const [warn,setWarn]=useState();
    //handle change task status
    const taskStatus=()=>{
        if(taskCompleted){
            setTaskCompleted(false);
        }else{
            setTaskCompleted(true);
        }
    }
    // handle delete event
    const deleteTask=()=>{
        //check task is completed or not
        if(!taskCompleted){
            setWarn("Task not completed please complete before delete");
            //close automatically warning popup
            setTimeout(function(){
                setWarn();
            },4000)
            return
        }
        axios({
            method: "delete",
            url: `https://kidaura-task-api.herokuapp.com/delete/${props.data._id}`,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
            .then(function (response) {
              //handle success
              //remove task from ui 
              props.removeTask(props.data);
              window.alert(response.data.message);

            })
            .catch(function (response) {
              //handle error
              window.alert("Error in deleting task");
            });
    }
    //showing update container
    const showUpdateBox=()=>{
        setUpdateBox(true);
    }
    // closing update container
    const closeUpdateBox=()=>{
        setUpdateBox(false);
    }
    //handle update evemnt
    const handleUpdate=(e)=>{
        e.preventDefault();
        const name=e.target.taskName.value;
        const description=e.target.content.value;
        axios({
            method: "post",
            url: `https://kidaura-task-api.herokuapp.com/update/${props.data._id}`,
            data: qs.stringify({name:name,content:description}),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
            .then(function (response) {
              //handle success
              window.alert(response.data.message);
              //update in ui
              props.updateTask(response.data.data);
            })
            .catch(function (response) {
              //handle error
              window.alert("Error in update");
            });
            //reset form 
            setUpdateBox(false);
    }
    //close warning popup 
    const closeWarn=()=>{
        setWarn();
    }
    //console.log("pr=",props.data)
    return(
        <div className="taskContent-container">
            <div>
                {/*---------completed and not completed button ----------------*/}
                <div className="checkCompleted" style={taskCompleted?style.notCompleted:style.completed} onClick={taskStatus}>
                    {taskCompleted?"Completed":"Not Completed"}
                </div>
                <div className='update-delete-container'>
                    {/*------delete button ----------*/}
                    <div onClick={deleteTask}>
                        Delete
                    </div>
                    {/*------open update container----------*/}
                    <div onClick={showUpdateBox}>
                        Update
                    </div>
                </div>
            </div>
            {/*----------showing task container------------*/}
            <div className="display-content">
                Name : {props.data.name}
                <hr />
                Description : {props.data.content}
            </div>
            {/*----------------tooltip---------------*/}
            <div className='tooltip'>
                <div>Created date : {props.data.createdAt.substring(0,10)}</div>
                <div>Created time : {props.data.createdAt.substring(11,16)}</div>
                <div>Last updated date : {props.data.updatedAt.substring(0,10)}</div>
                <div>Last updated time : {props.data.updatedAt.substring(11,16)}</div>
            </div>
            {/*----------update container for updating task-----------*/}
            { updateBox &&
                <div className='update-container'>
                    <h2 style={{display:"flex",justifyContent:"center"}}>Update Task</h2>
                    <form action="#" onSubmit={handleUpdate} name="resetUpdateForm">
                        <input type="text" name="taskName" placeholder={props.data.name} required/>
                        <input type="text" name="content" placeholder={props.data.content.substring(0,15)+"..."} required/>
                        <button>Submit</button>
                    </form>
                    {/*=----------closing button of update container-----------*/}
                    <div className='closeUpdate-button' onClick={closeUpdateBox}>
                        X
                    </div>
                </div>
            }
            {
                warn && <WarningPopUp data={warn} closeWarn={closeWarn}/>
            }
        </div>
    )
}
const style={
    completed:{
        backgroundColor:"green",
    },
    notCompleted:{
        backgroundColor:"red"
    }
}
export default TaskContent;