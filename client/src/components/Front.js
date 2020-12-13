import React, {Component} from 'react';

class Front extends Component {
    componentDidMount() {
        document.body.style.overflow = "hidden";
    }
    render() {
        return (
            <div className="front-container">
                <div className="front-header">
                    <h1 className="front-title">Journy</h1>
                    <h5 className="front-description mt-3">A platform for sharing projects</h5>
                    <button className="colored-btn mt-5" style={{border: "1px solid #fff"}} onClick={()=>window.location.href="/login"}>Login</button>
                    <button className="colored-btn mt-3" style={{border: "1px solid #fff"}} onClick={()=>window.location.href="/register"}>Register</button>
                </div>
            </div>
        )
    }
}

export default Front;