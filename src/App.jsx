import React from 'react'
import './App.css'
import {act} from "react-dom/test-utils";

function App() {

    const inputActivity = React.useRef(null)
    const [activities, setActivities] = React.useState([])

    function addActivity(event) {
        event.preventDefault();
        (inputActivity.current.value === "")
            ? alert("The input box still empty")
            : setActivities(activities.concat({
                id: Date.now(),
                activityName: inputActivity.current.value,
                status: 0
            }))
        inputActivity.current.value = ""
    }

    function removeActivity(activityId) {
        setActivities(activities.filter(activity => activity.id !== activityId))
    }

    function finishActivity(activityId) {
        const targetActivity = activities.filter(activity => activity.id === activityId)
        targetActivity[0].status = 1
        const restActivities = activities.filter(activity => activity.id !== activityId)
        setActivities([...targetActivity, ...restActivities])
    }

    //   for testing
    //   React.useEffect(() => alert("Root App function was called"), [])

    return (
        <div className="container p-4 bg-gray-600 w-10/12 min-h-[80vh] m-auto rounded lg:w-8/12 xl:1/2">
            <h1 className="text-white text-2xl font-bold mb-4">My Todo List</h1>
            <form onSubmit={(event) => addActivity(event)} className="flex justify-around gap-4 mb-4">
                <input placeholder="Activity Name" name="input" className="grow px-2 py-1 rounded text-center text-white bg-[#3b3b3b]"
                       ref={inputActivity}></input>
                <button className="font-bold p bg-neutral-800 text-white" type="submit">
                    <span className="hidden md:inline-block md:mr-2">Add</span> +
                </button>
            </form>
            <ul className="text-white divide-y-2">
                {activities.map((activity) => {
                    return <li key={activity.id} className="flex justify-between items-center py-2">
                        <p className={activity.status === 1 && "line-through"}>{activity.activityName}</p>
                        <div className="flex gap-2">
                            <button onClick={finishActivity.bind(this, activity.id)} className={"px-2 py-1 bg-green-700 rounded" + (activity.status === 1 && " hidden")}>Done</button>
                            <button onClick={removeActivity.bind(this, activity.id)} className="px-2 py-1 bg-red-700 rounded">Delete</button>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default App
