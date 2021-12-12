import {useState} from 'react';
import {useEffect} from 'react';
import TaskContent from './TaskContent';
function Tasks(props){
    //state for tasks
    const [task,setTask]=useState([]);
    //fetch tasks for first time
    useEffect(()=>{
        fetch('http://localhost:80/fetch')
        .then((res)=>res.json())
        .then((data)=>{
            setTask(data.data);
        })
        .catch((err)=>console.log(err));
    },[])
    //filter task
    useEffect(()=>{
        if(props.searchText=="all"){
            props.searchData(task);
            return;
        }
        const temp=task.filter((item)=>{
            return item.name.substring(0,props.searchText.length)==props.searchText;
        })
        props.searchData(temp);
    },[props.searchText])
    //update task state when new task added
    useEffect(()=>{
        {props.newTask && setTask(task => [...task,props.newTask])}
    },[props.newTask]);
    //handle remove task event
    const removeTask=(data)=>{
        let arr=[...task];
        let index=0;
        for(let i=0;i<arr.length;i++){
            //check removal task for removing from task state
            if(arr[i]._id==data._id){
                index=i;
                break;
            }
        }
        arr.splice(index, 1);
        setTask(arr);
    }
    //handle update event
    const updateTask=(data)=>{
        let arr=[...task];
        console.log("upst=",data);
        for(let i=0;i<arr.length;i++){
            if(arr[i]._id==data._id){
                arr[i]=data;
                break;
            }
        }
        setTask(arr);
    }
    return(
        <div className="tasks-container">
            {
                task.map((item)=>{
                    return <TaskContent data={item} removeTask={removeTask} updateTask={updateTask} key={item._id}/>
                })
            }
        </div>
    )
}
export default Tasks;