import React from 'react';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Email: '',
      Password: '',
      name: ''
    }
  }

  onEmailChange = (e) => {
    this.setState({Email: e.target.value})
  }
  onNameChange = (e) => {
    this.setState({name: e.target.value})
  }
  onPasswordChange = (e) => {
    this.setState({Password: e.target.value})
  }
  onSubmitSignIn = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.Email,
        password: this.state.Password,
        name: this.state.name
      })
    }).then(res => res.json())
    .then(data => {
      if (data){
        this.props.loadUser(data)
        this.props.onRouteChange('Home');
      }
    });
  }
  render()
  {
    return(
        <article className="br3 ba dark-grey b--black-10 mv4 shadow-5 w-100 w-50-m w-25-1 mw5 center">
        <main  className="pa4 black-80">
        <form  className="measure ">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend  className="f3 fw6 ph0 mh0">Register</legend>
            <div  className="mt3">
              <label  className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
              <input 
              onChange={this.onNameChange}
               className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
               type="text" 
               name="name"  
               id="name-address" />
            </div>
            <div  className="mt3">
              <label  className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
              onChange={this.onEmailChange}
               className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
               type="email" 
               name="email-address"  
               id="email-address" />
            </div>
            <div  className="mv3">
              <label  className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input 
              onChange={this.onPasswordChange}
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
            </div>
           
          </fieldset>
          <div  >
            <input  
            onClick={this.onSubmitSignIn}
            className="b pointer ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" 
            />
          </div>
        </form>
      </main>
      </article>
    );
}
}
export default Register;