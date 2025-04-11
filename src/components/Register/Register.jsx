import React from "react";

const Register = ({ onRouteChange }) => {
    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-1 mw6 shadow-5 center">
        <main className="pa4 black-80">
            <div>
                <fieldset id="Signup" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register !</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" type="text" name="name" id="name"/>
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" type="email" name="email-address" id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Type a new password</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" type="password" name="new-password" id="new-password"/>
                    </div>

                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Re-type the password again</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-purple hover-white w-100" type="password" name="re-password" id="re-password"/>
                    </div>

                </fieldset>
                <div className="">
                    <input 
                        onClick={() => onRouteChange('home')}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Submit" />
                </div>
            </div>
        </main>
        </article>
    );
}

export default Register;
