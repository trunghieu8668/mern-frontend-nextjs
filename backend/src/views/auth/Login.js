import React, {useState} from 'react'
import { signin, authenticate, isAuthenticated } from '../../models/auth/api'
import { Redirect } from 'react-router-dom'

const Login = () => {
  // useState
  const [values, setValues] = useState({
    userEmail: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false
  })

  const { userEmail, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated()
  const handleChange = name => event => {
    setValues({...values, error: '', [name]: event.target.value})
  }

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false, loading: true})
    signin({userEmail, password})
    .then(data => {
      if(data.error) {
        setValues({...values, error: data.error, loading: false})
      }
      else {
        authenticate(data, () => {
          setValues({...values, redirectToReferrer: true})
        })
      }
    })
  }

  const redirectToDashBoard = () => {
      if(redirectToReferrer) {
          if( user && user.role === 1) {
              return <Redirect to="/admin/dashboard"/>
          }
          else {

          }
      }
      if(isAuthenticated()){
          return <Redirect to="/"/>
      }
  }

  const showLoading = () => {
    if(loading){
        return <button className="btn btn-primary" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                  Loading...
                </button>
    }
    else {
        return <button onClick={clickSubmit} type="submit" className="btn btn-primary">Đăng nhập</button>
      }
  }

  const showError = () => (
      <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
          {error}
      </div>
  )

  const loginForm = () => (
      <form onBlur={()=> setValues({...values, error: ''})}>
        <div className="form-group">
          <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
          <input onChange={handleChange('userEmail')} value={userEmail} className="form-control py-4" id="inputEmailAddress" type="email" placeholder="Enter email address" />
        </div>
        <div className="form-group">
          <label className="small mb-1" htmlFor="inputPassword">Password</label>
          <input onChange={handleChange('password')} value={password} className="form-control py-4" id="inputPassword" type="password" placeholder="Enter password" />
        </div>
        <div className="form-group d-flex align-items-center justify-content-center mt-4 mb-0">
          {showLoading()}
        </div>
        {showError()}
      </form>
  )

  return (
    <div className="bg-light" id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header"><h3 className="text-center font-weight-light h5 my-4">Content Managerment System</h3></div>
                  <div className="card-body">
                    {loginForm()}
                    {redirectToDashBoard()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Login
