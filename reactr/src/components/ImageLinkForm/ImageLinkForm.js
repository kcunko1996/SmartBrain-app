import React from 'react';
import './ImageLinkForm.css'
const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return(
        // Detekcija slika slika sa danog linka 
        <div>   
        <p className='f3'>
        Detekcija lica
        </p>
        <div className=' center'>
        <div className='form center pa4 br3 shadow-5'>
            <input className='f4 pa2 w-80 center' onChange={onInputChange}></input>
            <button className='w-20 grow f4 link ph3 pv2 dib white bg-light-purple ' onClick={onSubmit}>Detect</button>
         </div>
        </div>
        </div>
    );
}

export default ImageLinkForm;