import React, { forwardRef, useRef, useImperativeHandle } from "react";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  height: 30px;
  background-color: white;
  border: 1px solid gray;
  cursor: pointer;
  display: flex;
  flex: 0 1 calc(10% - 8px);
  justify-content: center;
  align-items: center;
  margin: 12px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;
const TextContent = styled.div`
  font-size: 12px;
`;
const Seat = (props) => {
  const seatColor = {
    empty: "white",
    selected: "lime",
    booked: "lightgray",
  };
  const [seatStatus, setSeatStatus] = useState(props.status);
  const seatStyle = {
    backgroundColor: seatColor[seatStatus],
  };
  // console.log(seatStatus);
  const seatHandler = () => {
    if (seatStatus === "empty") {
      setSeatStatus("selected");
      props.onSeatClick();
    } else if (seatStatus === "selected") {
      setSeatStatus("empty");
      props.onSeatRemove();
    }
  };

  return (
    <Container style={seatStyle} onClick={seatHandler}>
      <TextContent>{props.seatid}</TextContent>
    </Container>
  );
};

export default Seat;
