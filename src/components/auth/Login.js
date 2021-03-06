import React, { Component } from 'react';
import TextFeildGroup from '../commonFeilds/TextFeildGroup';
import '../styles_components/submit.scss';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authAction';
import { withAlert } from 'react-alert';
import { withRouter } from 'react-router';

class Login extends Component {
  state = {
    email: '',
    password: '',
    username: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticate) {
      // this.props.history.push('/dashboard');
      // do this when the this file means login components just mounted ,
      // then check with the help of redux that is authenticated is true
      // of not if true then =>> give redirect to dashboard
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value // [e] ==>> add variable in object
    });
  };

  componentWillReceiveProps(nextProps) {
    // it's runs when our components recive new props
    // if (nextProps.auth.isAuthenticate) {
    //   this.props.history.push('/dashboard');
    // }
    if (nextProps.errors) {
      this.setState({
        // set nextProps.errors to local state
        errors: nextProps.errors
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history); // fired the loginUser action with passing current user
  };

  render() {
    const { errors } = this.state;
    const { alert } = this.props;
    typeof errors === 'string' &&
      alert.error(typeof errors === 'string' && errors);
    return (
      <div className='login'>
        <div className='container mt-5'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1
                className='display-4 text-center'
                style={{
                  fontSize: '30px',
                  color: '#17252a',
                  fontWeight: 400
                }}
              >
                Log In
              </h1>
              <p
                className='lead text-center'
                style={{
                  marginTop: '10px',
                  fontSize: '17px',
                  color: '#17252a',
                  fontWeight: 400
                }}
              >
                Sign in to your Nobabi Account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFeildGroup
                  name='username'
                  placeholder='phone or email'
                  type='username'
                  value={this.state.username}
                  onChange={this.onChange}
                  errors={errors.username}
                />

                <TextFeildGroup
                  name='password'
                  placeholder='password'
                  type='password'
                  value={this.state.password}
                  onChange={this.onChange}
                  errors={errors.password}
                />

                <div className='form'>
                  <input type='submit' value='Signin' id='input-submit' />{' '}
                </div>
              </form>
              <p
                className='lead text-center'
                style={{
                  marginTop: '20px',
                  fontSize: '15px',
                  color: '#17252a',
                  fontWeight: 400
                }}
              >
                Don't have an account ?{' '}
                <span
                  onClick={() => this.props.history.push('/register')}
                  style={{
                    color: '#dd202a',
                    cursor: 'pointer'
                  }}
                >
                  Signup{' '}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(mapStateToProps, { loginUser })(
  withRouter(withAlert()(Login))
);
