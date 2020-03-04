import React from 'react';

const Header = (props) => {
    return (
        <header className="wrapper">
            <h1>think mindful</h1>
            {
                props.userDetails
                    ?
                        <div className="userDeets">
                            {/* if no displayname exists, show email */}
                            <p>Hi {props.userDetails.displayName || props.userDetails.email}!</p>
                            <button onClick={props.logOut}>log out</button>
                        </div>
                    :
                        null
            }
        </header>
    )
}

export default Header;