import Filter from './components/Filter';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import {useState} from 'react';
function App() {
  //state for adding new task
  const [newTask,setNewTask]=useState();
  //state for filter search
  const [searchText,setSearchText]=useState();
  const [searchResult,setSearchResult]=useState([]);
  //function  for adding new task
  const addNewTask=(data)=>{
    setNewTask(data);
  }
  const searchTask=(data)=>{
    if(data.length<3){
      return
    }
    setSearchText(data);
  }
  //search data take i/p from filter input element
  const searchData=(data) => {
    setSearchResult(data);
  }

  const handleFilterForm=(e)=>{
    e.preventDefault();
    const filterTask=e.target.filterTask.value;
    if(filterTask.length<3){
      setSearchText("all");
    }else{
      setSearchText(filterTask);
    }
}
  return (
    <div className="App">
      <h1>To do app</h1>
      <Filter searchTask={searchTask} searchResult={searchResult} handleFilterForm={handleFilterForm}/>
      <AddTask addNewTask={addNewTask} />
      <Tasks newTask={newTask} searchText={searchText} searchData={searchData}/>
    </div>
  );
}

export default App;
