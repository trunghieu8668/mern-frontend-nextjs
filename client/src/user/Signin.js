import React, {useState} from 'react'
import Layout from '../core/Layout'
import { signin, authenticate, isAuthenticated } from '../auth'
import { Redirect } from 'react-router-dom';

const Signin = () => {
    // useState
    const [values, setValues] = useState({
        userEmail: 'admin@adsvietnam.vn',
        password: 'ads@123',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { userEmail, password, error, loading, redirectToReferrer} = values;
    const {user} = isAuthenticated()

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    };
    const clickSubmit = (event) =>{
        event.preventDefault()
        setValues({...values, error: false, loading: true})
        signin({userEmail, password})
        .then(data=> {
            if(data.error) {
                setValues({...values, error: data.error, loading: false})
            }
            else {
                authenticate(data, () =>{
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    })
                })
            }
        })
    };
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )
    const showLoading = () => (
        loading && (<div className="alert alert info"><h2>Loading...</h2></div>)
    )
    const redirectUser = () => {
        if(redirectToReferrer) {
            if( user && user.role === 1) {
                return <Redirect to="/admin/dashboard"/>
            }
            else {
                return <Redirect to="/user/dashboard"/>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/"/>
        }
    }
    const signInForm = ()=> (
        <form>
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
        <Layout title="Signin" description="Signin page" className="container col-lg-8 offset-lg-2">
            {showError()}
            {showLoading()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    </div>
}
export default Signin;
