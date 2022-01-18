import styled from "styled-components";
import Navbar from "../components/Navbar";
import SeatComponent from "../components/SeatComponent";

const Container = styled.div`
  // display: flex;
  // flex-directions: column;
`;
const Booking = ({ user, movie }) => {
  return (
    <Container>
      <Navbar user={user} />
      <SeatComponent user={user} movie={movie} />
    </Container>
  );
};

export default Booking;
