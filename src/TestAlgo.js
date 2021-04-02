import React, { useEffect, useState } from 'react';
import './testAlgo.css';







function PillList({ isOverflowed, setIsOverflowed }) {
    const ref = React.createRef();
    // const [counterList, setCounterList] = useState(pillContent);


    useEffect(() => {
        if (ref.current.clientWidth < ref.current.scrollWidth) {
            setIsOverflowed(true);
        } else {
            setIsOverflowed(false)
        }
    }, [])

    // const expandList = () => {
    //     // e.preventDefault();
    //     console.log('Hello world')
    //     counter.shift()
    // }

    return (
        <div ref={ref} className='container'>
        {pillContent.map((pill, i) => 
            <div className='pill' key={pill}>
                {pill}
            </div>)}
        {counter.length ? <div className='pill' key={counter.length}>+{counter.length} </div> : null}
        </div>
        );
}



function Extra({ isOverflowed, setIsOverflowed }) {
    return (<div className='container'>
                {counter.map((pill, i) => 
                    <div className='pill' key={pill}>
                        {pill}
                    </div>)
                }
            </div>
            );
}


function TestAlgo() {

    const [isOverflowed, setIsOverflowed] = useState(false);
    const [expanded, setExpanded] = useState(false);



    useEffect(() =>
        !isOverflowed ? counter.push(pillContent.pop()) : setIsOverflowed(false),// I have no idea why this works but don't touch it
        [isOverflowed]
    )




    return (
        <div>
            <PillList isOverflowed={isOverflowed} setIsOverflowed={setIsOverflowed}  />
            <Extra isOverflowed={isOverflowed} setIsOverflowed={setIsOverflowed} ></Extra>
        </div>
    );
}

const counter = [];
// const pillContent = ['Test', 'Another', 'Daniel', 'Lavrentiev']

const pillContent = ['Temkjst', 'Aer', 'Daiel', 'slkfj', 'sfewok', 'sodfghowe', 'jsdhfoweuih', 'fhoei'];

export default TestAlgo;