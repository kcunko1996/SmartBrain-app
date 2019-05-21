import React from 'react';
import './FaceRecognition.css'
const FaceRecognition = ({ImageUrl, box}) => {
    console.log(box)
    return(
        <div className='center ma '>   
        <div className='absolute mt5'>
        <img id='slika' alt="slika" src={ImageUrl} width='500px' height='auto'></img>
        <div className='bounding' style={{top: box.top, right: box.right, left:box.left, bottom:box.bottom }}></div>
        </div>
        </div>
    );
}

export default FaceRecognition;