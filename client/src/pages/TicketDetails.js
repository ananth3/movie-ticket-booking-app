import styled from "styled-components";
import { useState, useRef } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useEffect } from "react";
const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  //   background-color: gray;
  align-items: center;
  justify-content: center;
  //   background-image: linear-gradient(
  //       100deg,
  //       rgb(34, 34, 34) 10%,
  //       rgb(34, 34, 34) 10%,
  //       rgba(34, 34, 34, 0.04) 390%,
  //       rgb(34, 34, 34) 100%
  //     ),
  //     url(/auth-bg.jpg);
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

const Form = styled.div`
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

const LoginOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3px;
`;

const Text = styled.span``;

const TicketDetails = ({ user }) => {
  const [seats, setSeats] = useState();
  useEffect(() => {
    axios
      .post("/confirm-ticket", { userId: user._id })
      .then((res) => {
        setSeats(res.data);
      })
      .catch((err) => {
        console.log("Error in movie data");
      });
  }, []);
  return (
    <Container>
      <RegisterWrapper>
        <RegisterContainer>
          <LogoContainer>
            <Logo>Ticket Details</Logo>
          </LogoContainer>
          <Form>
            <InputBar> Movie name: </InputBar>
            <InputBar>Seat Number: </InputBar>
            <InputBar>Date: </InputBar>
          </Form>
        </RegisterContainer>
      </RegisterWrapper>
    </Container>
  );
};

export default TicketDetails;
