import {useState} from 'react';
function Filter(props){
    const [filterKeyword,setFilterKeyword]=useState("");
    const handleFilter=(e)=>{
        //e.preventDefault();
        if(e.keyCode===8){
            let temp=filterKeyword;
            if(temp.length<=0){
                return
            }
            temp=temp.substring(0,temp.length-1);
            setFilterKeyword(temp);
            props.searchTask(temp);
            return
        }
        
        let text = filterKeyword+String.fromCharCode(e.keyCode).toLowerCase();
        setFilterKeyword(text);
        console.log(text);
        if(text.length>=3){
            props.searchTask(text);
        }
    }
    
    return(
        <div className="filter-container">
            <form action='#' onSubmit={props.handleFilterForm}>
                <input type="text" placeholder="Enter keyword" name="filterTask" onKeyDown={handleFilter}/>
                <button>Search </button>
            </form>
            <div>
                {
                    props.searchResult.map((item)=>{
                        return (
                        <div className="search-result"key={item._id}> {item.name}</div>
                        )

                    })
                }
            </div>
        </div>
    )
}
export default Filter;