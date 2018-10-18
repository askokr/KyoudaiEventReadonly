import React from "react";
import { GoogleLogin } from "react-google-login-component";

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  responseGoogle(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();

    console.log({ googleId });
    console.log({ accessToken: id_token });
    //anything else you want to do(save to localStorage)...
    // document.cookie = JSON.stringify(id_token);
  }

  render() {
    return (
      <div>
        <GoogleLogin
          socialId="64126451358-mmmraa7mnlsjktmbptde0v3fe5p6ns2g.apps.googleusercontent.com"
          className="google-login"
          scope="https://www.googleapis.com/auth/spreadsheets"
          fetchBasicProfile={false}
          responseHandler={this.responseGoogle}
          buttonText="Login With Google"
        />
      </div>
    );
  }
}

export default Login;
