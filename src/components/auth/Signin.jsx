import { React, Component }  from 'react';
import './Signin.css';

// destructuring in a react class
// https://medium.com/@lcriswell/destructuring-props-in-react-b1c295005ce0

class Signin extends Component{
  constructor(props){
    super(props);
    this.state = {
      signInEmail:'',
      signInPassword:''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail:event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword:event.target.value});
  }

  onSubmitSignin = () => {
    const { signInEmail, signInPassword} = this.state;
    fetch('http://localhost:3100/signin', {
      method:'post',
      headers:{'Content-type': 'application/json'},
      body: JSON.stringify({
        email:signInEmail,
        password:signInPassword
      })
    })
      .then (resp => resp.json())
      .then (data => {
        console.log(data);
        if (data.status === 200){
          this.props.loadUser(data.user);
          this.props.onRouteChange('home');
        }
        else {
          const message = document.querySelector('.signin-error');
          message.innerHTML = data.message;
          message.classList.toggle('signin-error-hide');
        }
      })
  }
  render(){
    const { onRouteChange} = this.props;
    return (
      <div  className='signin-form'>
        <h4 className='text-center'>Sign in </h4>
        <div className='mb-3'>
          <label htmlFor="email" className='mb-2'>Email</label>
          <input onChange={this.onEmailChange} 
          placeholder="email"  
          className='form-control' type="email" name='email' id='email'/>
        </div>
        <div className='mb-3'>
          <label htmlFor="password" className='mb-2'>Password</label>
          <input onChange={this.onPasswordChange} 
           placeholder='password'  
          className='form-control' type="password" name='password'id='password'/>
        </div>
        <div className='signin-error signin-error-hide text-center my-3'>
            Invalid email or password
        </div>
        <div className='form-btns'>
          <button type='submit' className='btn btn-outline-primary'
          onClick={this.onSubmitSignin}>Sign in</button>
          <button type='button' className='btn btn-dark border boder-light'
           onClick={() => onRouteChange('signup')}>Sign up</button>
        </div>
      </div>
    )
  }
}  
  
export default Signin;