import React, { useState, useEffect} from 'react';
import mockdata from './mockdata';

const Larpit = () => {
    const [pelit, setPelit] = useState(mockdata);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const maxIndex = pelit.length -1;
        if (index < 0) {
            setIndex(maxIndex);
        }
        if (index > maxIndex) {
            setIndex(0)
        }
    }, [index, pelit]);

    useEffect(() => {
        let slider = setInterval(() => {
            setIndex(index +1);
        }, 5000);
        return () => {
            clearInterval(slider);
        };
    }, [index]);

    return(
        <h2>Menneitä yhteistyöprojekteja</h2>
    )
} 

export default Larpit;