import React from "react"
import "./Navbar.css"

const Items = (props) => {
    return (
        <><li><a className="anchor" href={props.href}>{props.title}</a></li></>
    )
}

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <nav className="navbar">
            <div className="nav-container">
                <h2 className="nav-logo">Barilon</h2>
                <ul className={open ? "nav-links open" : "nav-links"} >
                    <Items title="Home" href="/" />
                    <Items title="About" href="" />
                    <Items title="UK Tax" href="" />
                    <Items title="Contact" href="" />
                </ul>
                <div className="auth-btn">
                    <a href="/auth/login" className="nav-btn" >SignUp</a>
                    <a href="/auth/login" className="nav-btn" >Login</a>
                </div>
                <div className="hamburger" onClick={() => setOpen(!open)}>
                    <div className={open ? "line line1-open" : "line"}></div>
                    <div className={open ? "line line2-open" : "line"}></div>
                    <div className={open ? "line line3-open" : "line"}></div>
                </div>
            </div>


        </nav>
    )
}

export default Navbar
