import React from 'react'
import './App.css'
import {act} from "react-dom/test-utils";

function App() {

    const input = React.useRef(null)
    const [activities, setActivities] = React.useState(["Makan", "Minum"])

    function addActivity(event) {
        event.preventDefault();
        (input.current.value === "") ? alert("The input box still empty") : setActivities(activities.concat(input.current.value))
        input.current.value = ""
    }

  //   for testing
  //   React.useEffect(() => alert("Root App function was called"), [])

  return (
    <div className="container p-4 bg-gray-600 w-10/12 min-h-[80vh] m-auto rounded lg:w-8/12 xl:1/2">
        <form onSubmit={(event) => addActivity(event)} className="flex justify-around gap-4 mb-4">
            <input placeholder="Activity Name" name="input" className="grow px-2 py-1 rounded text-center" ref={input}></input>
            <button className="font-bold p bg-neutral-800" type="submit"><span className="hidden md:inline-block md:mr-2">Add</span>+</button>
        </form>
        <ul>
            {activities.map((activity, index) => {
                return <li key={index}>{activity}</li>
            })}
        </ul>
    </div>
  )
}

export default App
