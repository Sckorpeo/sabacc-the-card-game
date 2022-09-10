import React, { useState } from 'react';

import CardHolder from './CardHolder';

const SeeHand = ({ hand }) => {
    const [style, setStyle] = useState({});
    const [toggle, setToggle] = useState(false);

    const handleMouseDown = (ev) => {
        console.log(ev);
        setStyle({
            top: `${ev.screenY}`,
            left: `${ev.screenX}`,
        });
        console.log(style);
        setToggle(true);
    };
    const handleMouseUp = () => {
        setToggle(false);
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{ height: '35px', width: '80px' }}
        >
            {!toggle && <button>See Hand</button>}
            {toggle && <CardHolder hand={hand} />}
        </div>
    );
};

export default SeeHand;
