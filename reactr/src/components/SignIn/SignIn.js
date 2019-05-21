import React from 'react';

class SignIn extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      SignInEmail: '',
      SignInPassword: ''
    }
  }

  onEmailChange = (e) => {
    this.setState({SignInEmail: e.target.value})
  }
  onPasswordChange = (e) => {
    this.setState({SignInPassword: e.target.value})
  }
  onSubmitSignIn = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.SignInEmail,
        password: this.state.SignInPassword
      })
    }).then(res => res.json())
    .then(data => {
      if(data.id){
        this.props.loadUser(data);
        this.props.onRouteChange('Home')
      }
    
    });
  }
  render(){
    
    return(
        <article className="br3 ba dark-grey b--black-10 mv4 shadow-5 w-100 w-50-m w-25-1 mw5 center">
        <main  className="pa4 black-80">
        <form  className="measure ">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend  className="f3 fw6 ph0 mh0">Sign In</legend>
            <div  className="mt3">
              <label  className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
              onChange = {this.onEmailChange}
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
            </div>
            <div  className="mv3">
              <label  className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input 
              onChange = {this.onPasswordChange}
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
            </div>
           
          </fieldset>
          <div  >
            <input  
            onClick={this.onSubmitSignIn}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" 
            />
          </div>
          <div  className="lh-copy mt3">
            <p onClick={this.onSubmitSignIn} 
            className=" pointer f6 link dim black db">Register</p>
          
          </div>
        </form>
      </main>
      </article>
    );
}
}
export default SignIn;