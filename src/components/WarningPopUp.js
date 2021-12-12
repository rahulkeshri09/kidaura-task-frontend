function WarningPopUp(props){
    return(
        <div className="warning-container">
            <h2>WARNING</h2>
            <div>
                {props.data}
            </div>
            {/*------------close button for warning popup-----------*/}
            <span className="close-warning-box" onClick={props.closeWarn}>
                X
            </span>
        </div>
    )
}
export default WarningPopUp;