import React from 'react'

const Navigation = ({onRouteChange, IsSigned}) => {
    if(IsSigned === true){
    return(
        <nav  style={{display: 'flex', justifyContent:'flex-end'} }> 
            <p  onClick={() =>  onRouteChange('SignIn')} className='f4 link dim black underline pa3 pointer'>Sign out</p>
        </nav>
    );
    } else{
        return(
        <nav  style={{display: 'flex', justifyContent:'flex-end'} }> 
        <p  onClick={() =>  onRouteChange('Register')} className='f4 link dim black underline pa3 pointer'>Register</p>
        <p  onClick={() =>  onRouteChange('SignIn')} className='f4 link dim black underline pa3 pointer'>Sign In</p>
    </nav>
        )
    }
}

export default Navigation;