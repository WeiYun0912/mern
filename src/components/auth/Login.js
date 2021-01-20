import React from 'react'
import useForm from "../hook/useForm";
import {Link, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { login } from "../../actions/auth";
export const Login = ({login , isAuthenticated}) => {
    const [values,changeHandler] = useForm({
        email : "",
        password : "",
    });

    const {email,password} = values;

    const onSubmit = async e => {
        e.preventDefault();
        login(email,password);
    }

    //Redirect if logged in

    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }

    return (
        <>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Your Account</p>
            <form className="form" onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={changeHandler}/>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={changeHandler}
                        autoComplete="false"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/login">Register</Link>
            </p>
        </>
    )
}

Login.protoType = {
    login : PropTypes.func.isRequired,
    isAuthenticated : PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login);