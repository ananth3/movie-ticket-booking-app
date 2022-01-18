import { useEffect, useRef } from "react";
import styled from "styled-components";
import Seat from "./Seat";
import { useState } from "react";
import axios from "axios";
import Alertbox from "./Alertbox";
import { Card } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

const SeatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 580px;
  padding: 10px;
  margin: 0 auto;
  margin-top: 8px;
  background-color: #f2f2f2;
`;

const MovieData = styled.div`
  padding: 10px;
  background-color: #1f2533;
  width: 100%;
  color: white;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
`;

const Data = styled.span``;

const Screen = styled.div`
  padding: 3px;
  width: 75%;
  // height: 0px;
  background-color: black;
  color: white;
  text-align: center;
`;

const SeatParent = styled.div`
  padding: 40px;
  display: flex;
  width: 75%;
  flex-flow: row wrap;
  //   background-color: green;
`;

const SampleSeats = styled.div`
  width: 75%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const SampleSeatWrapper = styled.div`
  width: 65px;
`;

const ConfirmButton = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 8px;
  margin: 15px 0;
  background-color: #f84464;
  border: none;
  color: white;
  // font-weight: 550;
  font-size: 15px;
  cursor: pointer;
`;

const SeatComponent = ({ user, movie }) => {
  // const [seatNumber, setSeatNumber] = useState("");
  const [show, setShow] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  let seatArray = [];
  const [allSeats, setAllSeats] = useState([]);
  const onSeatClick = (seatNum) => {
    seatArray.push(seatNum);
  };
  const removeNumber = (arr, num) => arr.filter((el) => el !== num);
  const onSeatRemove = (seatNum) => {
    seatArray = removeNumber(seatArray, seatNum);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // console.log(seatArray);
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const seats = await axios.get("/seat/details/all-seats");
        setAllSeats(seats.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSeats();
  }, []);
  // console.log(allSeats);
  const renderSeats = () => {
    return allSeats.map((seat) => (
      <Seat
        key={seat.seat_number}
        seatid={seat.seat_number}
        status={seat.status}
        onSeatClick={() => onSeatClick(seat.seat_number)}
        onSeatRemove={() => onSeatRemove(seat.seat_number)}
      ></Seat>
    ));
  };
  // console.log(seatNumber);

  const bookTicket = async () => {
    try {
      seatArray.map(async (seat) => {
        await axios.post("/ticket", {
          seat_number: seat,
          userId: user._id,
          movie_name: movie.data?.name,
        });
        await axios.put(`/seat/${seat}`, { status: "booked" });
      });
      console.log(seatArray);
      if (seatArray.length === 0) {
        setErrorShow(true);
        scrollToTop();
      } else {
        setShow(true);
        scrollToTop();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SeatContainer>
      {
        <Alert
          show={show}
          variant="success"
          onClose={() => setShow(false)}
          dismissible
          style={{ width: "100%", height: "50px" }}
        >
          Your ticket booked successfully.
        </Alert>
      }
      {
        <Alert
          show={errorShow}
          variant="warning"
          onClose={() => setErrorShow(false)}
          dismissible
          style={{ width: "100%", height: "50px" }}
        >
          Please select atleast one seat for booking
        </Alert>
      }
      <MovieData>
        <Data> {movie.data?.name} </Data>
        <Data>Luxe Cinemas: Chennai </Data>
      </MovieData>
      <Screen>Screen this way</Screen>
      <SeatParent>{allSeats ? renderSeats() : <h1>Loading...</h1>}</SeatParent>
      <SampleSeats>
        <SampleSeatWrapper>
          <Seat status="empty" />
          Available
        </SampleSeatWrapper>
        <SampleSeatWrapper>
          <Seat status="selected" />
          Selected
        </SampleSeatWrapper>
        <SampleSeatWrapper>
          <Seat status="booked" />
          Unavailable
        </SampleSeatWrapper>
      </SampleSeats>
      <ConfirmButton onClick={bookTicket}>Confirm ticket</ConfirmButton>
    </SeatContainer>
  );
};

export default SeatComponent;
