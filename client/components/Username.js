import React, { useState } from 'react';

const Username = () => {
    const [toggle, setToggle] = useState(false);

    let username = window.localStorage.getItem('username');

    const handleClick = (ev) => {
        ev.preventDefault();
        setToggle(!toggle);
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        window.localStorage.setItem('username', ev.target.username.value);
        username = ev.target.username.value;
        setToggle(!toggle);
    };

    return toggle ? (
        <form onSubmit={handleSubmit}>
            <input placeholder={username} name="username"></input>
            <button></button>
        </form>
    ) : (
        <a href="/" onClick={handleClick}>
            {username}
        </a>
    );
};

export default Username;
