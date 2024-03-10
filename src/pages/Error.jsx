import { NavLink } from "react-router-dom"

export const Error =()=>{
    return (
        <>
            <div id="error-page">
                <div className="container content">
                    <h2 className="header">404</h2>
                    <h4> Sorry! page not found</h4>
                    <p>
                        oops it seems like the opage you are trying to access doesn't exist
                        if you believe there is an issue, feel free to report it and we will look into it 
                    </p>
                    <div className="btns">
                        <NavLink to ="/">return home</NavLink>
                        <NavLink to="/contact">report problem</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}