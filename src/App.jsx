import React from 'react'
import './App.css'
import {act} from "react-dom/test-utils";

function App() {

    const [error, setError] = React.useState({status: false})
    const [edited, setEdited] = React.useState({})
    const [input, setInput] = React.useState("")
    const [activities, setActivities] = React.useState([])

    function saveActivity(event) {
        event.preventDefault();

        if (input === "") return setError({
            status: true,
            message: "Please enter an activity name!"
        })
        setError({status: false})

        if (edited.id) {
            // tempActivities variable used to prevent the state from being mutated directly
            const tempActivities = activities
            tempActivities.forEach((activity, index) => {
                if (activity.id === edited.id) {
                    tempActivities[index] = {
                        id: edited.id,
                        activityName: input,
                        status: edited.status
                    }
                }
            })
            return cancelEdit()
        }

        setActivities(activities.concat({
            id: Date.now(),
            activityName: input,
            status: 0
        }))
        setInput("")
    }

    function removeActivity(activityId) {
        setActivities(activities.filter(activity => activity.id !== activityId))
        if (edited.id) cancelEdit()
    }

    function editActivity(activity) {
        setEdited(activity)
        setInput(activity.activityName)
    }

    function cancelEdit() {
        setEdited({})
        setInput("")
    }

    function finishActivity(activityId) {
        const targetActivity = activities.filter(activity => activity.id === activityId)
        targetActivity[0].status = 1
        const restActivities = activities.filter(activity => activity.id !== activityId)
        setActivities([...targetActivity, ...restActivities])
    }

    //   just testing
    //   React.useEffect(() => alert("Root App function was called"), [])

    //  grouping CSS classes
    const buttonStyle = "px-2 py-1 rounded bg-[transparent] border-2 border-[#3b3b3b]"

    const actionButtonText = "text-white mr-2 hidden lg:inline-block"

    return (
        <div className="container p-4 bg-gray-700 w-full h-[90vh] m-auto rounded-xl lg:h-[80vh] lg:w-8/12 overflow-hidden">
            <h1 className="text-white text-2xl font-bold mb-4">My Todo List</h1>
            {error.status && <i className="text-red-500 text-lg">{error.message}</i>}
            <form onSubmit={(event) => saveActivity(event)} className="flex justify-around gap-2 mb-4">
                <input placeholder="Activity Name" name="input"
                       className="grow px-2 py-1 rounded text-center text-white bg-[#3b3b3b]"
                       onChange={(event) => setInput(event.target.value)} value={input}
                />
                <button className="font-bold bg-neutral-800 text-white" type="submit">
                    {
                        (edited.id)
                            ? <><span className="hidden md:inline-block md:mr-2">Edit</span>
                                <i className="fa-solid fa-pen"></i></>
                            : <><span className="hidden md:inline-block md:mr-2">Add</span>
                                <i className="fa-solid fa-plus"></i></>
                    }
                </button>
                {
                    (edited.id) &&
                    <button className={"font-bold bg-red-800 text-white"} onClick={cancelEdit}>
                        <span className="hidden md:inline-block md:mr-2">Cancel</span>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                }
            </form>
            <ul className="text-white divide-y-2 overflow-auto h-[80%]">
                {
                    activities.length <= 0
                        ? <h2 className="text-center items-center translate-y-full italic">Your list is empty</h2>
                        : activities.map((activity) => {
                            return <li key={activity.id} className="flex justify-between items-center py-2 px-2">
                                <p className={activity.status === 1 ? "line-through" : ""}>{activity.activityName}</p>
                                <div className="flex gap-2">
                                    <button onClick={editActivity.bind(this, activity)}
                                            className={buttonStyle + " text-blue-500"}>
                                        <span className={actionButtonText}>Edit</span>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button onClick={finishActivity.bind(this, activity.id)}
                                            className={buttonStyle + " text-green-500 " + (activity.status === 1 && "hidden")}>
                                        <span className={actionButtonText}>Done</span>
                                        <i className="fa-solid fa-check"></i>
                                    </button>
                                    <button onClick={removeActivity.bind(this, activity.id)}
                                            className={buttonStyle + " text-red-500"}>
                                        <span className={actionButtonText}>Delete</span>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </li>
                        })
                }
            </ul>
        </div>
    )
}

export default App
