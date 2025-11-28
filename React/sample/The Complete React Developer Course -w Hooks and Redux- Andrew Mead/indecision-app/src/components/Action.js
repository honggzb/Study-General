import React from 'react';

//Stateless Functional Component
const Action = (props) => (
        <div>
            <button className="big-button" onClick={props.handlePick} disabled={!props.hasOptions}>What should I do?</button>
        </div>
);

export default Action;