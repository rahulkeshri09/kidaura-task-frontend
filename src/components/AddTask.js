import WarningPopUp from './WarningPopUp';
import {useState} from 'react';
import axios from 'axios';
import qs from 'qs';
function AddTask(props){
    const [warn,setWarn]=useState();
    //add new task
    const add=(e)=>{
        //avoid default events happening
        e.preventDefault();
        const name=e.target.taskName.value;
        const description=e.target.content.value;
        //show warning if task name not exists
        if(name.length<=0){
            setWarn("Enter name or description of task");
            setTimeout(function(){
                console.log("name");
                setWarn()
            },5000);
            
            return
        }
        //show warning if task description not exists
        if(description.length<=0){
            setWarn("Enter name or description of task");
            setTimeout(function(){
                console.log("desc");
                setWarn()
            },5000);
            return
        }
        //create a data (task) in backend
        axios({
            method: "post",
            url: "http://localhost:80/create",
            data: qs.stringify({name:name,content:description}),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
            .then(function (response) {
              //handle success
              window.alert(response.data.message);
              props.addNewTask(response.data.data);
            })
            .catch(function (response) {
              //handle error
              window.alert("data already exists");
            });
            //reset form 
            document.resetForm?.reset();
    }
    //close warning popup
    const closeWarn=()=>{
        setWarn();
    }
    return(
        <div className="addTask-container">
            {/*-------add task form-----------*/}
            <form className="addTask-form" action="#" onSubmit={add} name="resetForm">
                <input type="text" name="taskName" placeholder="Enter task name"/>
                <input type="text" name="content" placeholder="Enter description"/>
                <button>Add Task</button>
            </form>
            {   
            //warning popup
                warn && <WarningPopUp data={warn} closeWarn={closeWarn}/>
            }
        </div>
    )
}
export default AddTask;