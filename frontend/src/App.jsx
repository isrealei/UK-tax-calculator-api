import react from "react"
import Navbar from "./Navbar"
import CalculatorUi from "./CalculatorUi"
import Heros from "./Heros"
import { Routes, Route } from "react-router-dom"


const App = () => {
    return (
        <div>
            <Navbar />
            <CalculatorUi />
        </div>
    )
}

export default App
