import styled from "styled-components";
import { useState, useRef } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: gray;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
      100deg,
      rgb(34, 34, 34) 10%,
      rgb(34, 34, 34) 10%,
      rgba(34, 34, 34, 0.04) 390%,
      rgb(34, 34, 34) 100%
    ),
    url(/auth-bg.jpg);
`;

const RegisterWrapper = styled.div`
  // display: flex;
  background-color: white;
  width: 28%;
  height: 62%;
  // justify-content: center;
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  // flex: 1;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
`;

const Logo = styled.span`
  margin: 25px 0;
  font-size: 28px;
  font-weight: 550;
  color: black;
  overflow: hidden;
`;

const Form = styled.form`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBar = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px;
  background-color: #e8e8e8;
  border-radius: 5px;
  width: 70%;
  height: 35px;
  align-items: center;
`;

const Input = styled.input`
  font-weight: 400;
  border: none;
  outline: none;
  background-color: #e8e8e8;
  padding-left: 6px;
  width: 100%;
`;

const Button = styled.button`
  width: 70%;
  height: 35px;
  margin: 15px 0;
  border-radius: 8px;
  background-color: #00308f;
  color: white;
  font-size: 15px;
  font-weight: 550;
  border: none;
  outline: none;
  cursor: pointer;
`;

const LoginOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3px;
`;

const Text = styled.span``;

const ErrorText = styled.span`
  color: red;
  font-size: 15px;
  font-weight: 550;
  margin-bottom: 5px;
`;

const Login = (props) => {
  const email = useRef();
  const password = useRef();
  const history = useHistory();
  const [error, setError] = useState();
  const loginHandler = async (e) => {
    e.preventDefault();
    const user = {
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const res = await axios.post("/auth/login", user);
      console.log(res.data);
      if (res.data === "Invalid Username or Password") {
        // password.current.setCustomValidity("Username or Password incorrect");
        setError(res.data);
      } else {
        history.push("/");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <RegisterWrapper>
        <RegisterContainer>
          <LogoContainer>
            <Logo>TicketShow</Logo>
          </LogoContainer>
          <Form onSubmit={loginHandler}>
            <ErrorText>{error}</ErrorText>
            <InputBar>
              <Input placeholder="Email" type="email" required ref={email} />
            </InputBar>
            <InputBar>
              <Input
                placeholder="Password"
                type="password"
                required
                ref={password}
              />
            </InputBar>
            <Button>Log In</Button>
            <LoginOption>
              <Text>
                Don't have an account?{" "}
                <Link to="/register" style={{ textDecoration: "inherit" }}>
                  Sign up
                </Link>
              </Text>
            </LoginOption>
          </Form>
        </RegisterContainer>
      </RegisterWrapper>
    </Container>
  );
};

export default Login;
