import React from 'react';


const Rank = ({name, entries}) => {
    
    return(
        <div>   
            <div className='white f3'>
                {`${name} Broj slika koji je detektiran sa vašeg profila je : `}
            </div>
            <div className='white f1'>
                {entries ? `${entries}` : '0'}
            </div>
        </div>
    );
}

export default Rank;