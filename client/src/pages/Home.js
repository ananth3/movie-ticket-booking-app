import styled from "styled-components";
import MovieComponent from "../components/MovieComponent";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovieText = styled.div`
  font-size: 22px;
  font-weight: 600;
  padding: 70px 0 0 48px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  // justify-content: space-evenly;
`;

const ButtonDiv = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;
const ChangeButton = styled.button`
  width: 120px;
  height: 38px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  border-radius: 6px;
  background-color: #00308f;
  outline: none;
  border: none;
`;

const Home = ({ user, movie }) => {
  const history = useHistory();
  const admin = process.env.REACT_APP_ADMIN;
  const movieName = movie.data?.name.toLowerCase();
  const buttonHandler = () => {
    history.push("/change-movie");
  };
  return (
    <Container>
      <Navbar user={user} />
      <MovieText>Recommended Movie</MovieText>
      <MovieListContainer>
        <Link to={`/${movieName}`} style={{ textDecoration: "inherit" }}>
          {" "}
          <MovieComponent movie={movie} />
        </Link>
      </MovieListContainer>
      {user._id === admin ? (
        <ButtonDiv>
          <ChangeButton onClick={buttonHandler}>Change movie</ChangeButton>
        </ButtonDiv>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Home;
