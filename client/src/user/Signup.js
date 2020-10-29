import React, {useState} from 'react'
import Layout from '../core/Layout'
import {signup} from '../auth'

const Signup = () => {
    // useState
    const [values, setValues] = useState({
        userName: '',
        userEmail: '',
        password: '',
        error: '',
        success: false
    });

    const {userName, userEmail, password, error, success} = values;


    const handleChange = userName => event => {
        setValues({...values, error: false, [userName]: event.target.value})
    };
    const clickSubmit = (event) =>{
        event.preventDefault()
        setValues({...values, error: false})
        signup({userName, userEmail, password})
        .then(data=> {
            if(data.error) {
                setValues({...values, error: data.error, success: false})
            }
            else {
                setValues({
                    ...values,
                    userName: '',
                    userEmail: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })
    };
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )
    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            New account is created. Please signin
        </div>
    )
    const signUpForm = ()=> (
        <form>
            <div className="form-group">
                <label htmlFor="formGroupExampleInput">Name</label>
                <input onChange={handleChange('userName')} value={userName} type="text" className="form-control" id="formGroupExampleInput" placeholder="Username" />
            </div>
            <div className="form-group">
                <label htmlFor="formGroupExampleInput2">Email</label>
                <input onChange={handleChange('userEmail')} value={userEmail} type="email" className="form-control" id="formGroupExampleInput2" placeholder="Email" />
            </div>
            <div className="form-group">
                <label htmlFor="formGroupExampleInput3">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" id="formGroupExampleInput3" placeholder="Password" />
            </div>
            <button onClick={clickSubmit} type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
    return <div>
        <Layout title="Signup" description="Signup page" className="container col-lg-8 offset-lg-2">
            {showError()}
            {showSuccess()}
            {signUpForm()}
        </Layout>
    </div>
}
export default Signup;
