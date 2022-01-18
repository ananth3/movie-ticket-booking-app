import styled from "styled-components";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import Validation from "../components/Validation";

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
  // background-color: #e8e8e8;
  background-color: white;
  width: 28%;
  height: 68%;
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
  height: 280px;
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
  height: 30px;
  align-items: center;
`;

const Input = styled.input`
  font-weight: 400;
  background-color: #e8e8e8;
  border: none;
  outline: none;
  padding-left: 6px;
  width: 100%;
`;

const Button = styled.button`
  width: 70%;
  height: 35px;
  margin: 10px 0;
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
  margin-top: 10px;
`;

const Text = styled.span``;

const ErrorText = styled.span`
  font-size: 12px;
  font-weight: 550;
  color: red;
  margin-bottom: 1px;
`;

const SuccessText = styled.span`
  font-size: 13px;
  font-weight: 550;
  color: green;
  margin-bottom: 1px;
`;

const Register = (props) => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const rePassword = useRef();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [errors, setErrors] = useState({});
  const [statusError, setStatusError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const history = useHistory();
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const registerHandler = async (e) => {
    e.preventDefault();

    console.log(Validation(values));
    if (Object.keys(Validation(values)).length === 0) {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      console.log(user);
      try {
        const res = await axios.post("/auth/register", user);
        console.log(res.status);
        setSuccessMessage(res.data.message);
        // history.push("/login");
      } catch (err) {
        // console.log(err.response.data.message);
        setStatusError(err.response.data.message);
      }
    } else {
      setErrors(Validation(values));
      // const user = {
      //   username: username.current.value,
      //   email: email.current.value,
      //   password: password.current.value,
      // };
      // console.log(user);
      // try {
      //   const res = await axios.post("/auth/register", user);
      //   console.log(res.data);
      //   // history.push("/login");
      // } catch (err) {
      //   console.log(err);
      // }
    }
  };
  return (
    <Container>
      <RegisterWrapper>
        <RegisterContainer>
          <LogoContainer>
            <Logo>TicketShow</Logo>
          </LogoContainer>
          <Form onSubmit={registerHandler}>
            <SuccessText>{successMessage}</SuccessText>
            <ErrorText>{statusError}</ErrorText>
            <InputBar>
              <Input
                placeholder="Username"
                ref={username}
                name="name"
                value={values.name}
                onChange={handleChange}
              />
            </InputBar>
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
            <InputBar>
              <Input
                placeholder="Email"
                type="email"
                ref={email}
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </InputBar>
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
            <InputBar>
              <Input
                placeholder="Password"
                type="password"
                ref={password}
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </InputBar>
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
            <InputBar>
              <Input
                placeholder="Re-enter password"
                type="password"
                ref={rePassword}
                name="rePassword"
                value={values.rePassword}
                onChange={handleChange}
              />
            </InputBar>
            {errors.rePassword && <ErrorText>{errors.rePassword}</ErrorText>}
            <Button>Sign up</Button>
            <LoginOption>
              <Text>
                Have an account?{" "}
                <Link to="/login" style={{ textDecoration: "inherit" }}>
                  Log in
                </Link>
              </Text>
            </LoginOption>
          </Form>
        </RegisterContainer>
      </RegisterWrapper>
    </Container>
  );
};

export default Register;
