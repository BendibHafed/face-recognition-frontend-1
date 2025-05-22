import React from "react";
import { API_URL } from "../../config";

class Register extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
            name: '',
            email: '',
            password: ''
        };
    };

    onSubmissionRegister = () => {
        fetch(`${API_URL}/register`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home'); 
            }
        }).catch(err => console.log("unable to register: ", err));      
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }


    render () {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-1 mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div>
                    <fieldset id="Signup" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register !</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" 
                                type="text" 
                                name="name" 
                                id="name"
                                onChange={ this.onNameChange }
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" 
                                type="email" 
                                name="email-address" 
                                id="email-address"
                                onChange={ this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="new-password">Type a new password</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" 
                                type="password" 
                                name="new-password" 
                                id="new-password"
                                onChange={ this.onPasswordChange }
                            />
                        </div>
    
                    </fieldset>
                    <div className="">
                        <input 
                            onClick={this.onSubmissionRegister}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register" />
                    </div>
                </div>
            </main>
            </article>
        );
    }
    
}

export default Register;
