import React from "react";
import { API_URL } from "../../config";

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''

        }
    }

    onSubmitSignIn = () => {
        fetch(`${API_URL}/signin`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user =>{
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home'); 
            }
        });      
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    render () {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-1 mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div>
                    <fieldset id="Signup" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" 
                                    type="email" 
                                    name="email-address" 
                                    id="email-address"
                                    onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" 
                                type="password" 
                                name="password" 
                                id="password"
                                onChange={this.onPasswordChange}
                            />
                        </div>
    
                    </fieldset>
                    <div className="">
                        <input 
                            onClick={this.onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign-in" />
                    </div>
                    <div className="lh-copy mt3">
                        <p 
                            className="f6 dim link black db pointer"
                            onClick={() => this.props.onRouteChange('register')}>
                            Register?
                        </p>
                    </div>
                </div>
            </main>
            </article>
        );
    }
}

export default Signin;