import Navbar from "../components/Navbar";
import MovieInfoComponent from "../components/MovieInfoComponent";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovieDetails = ({ user, movie }) => {
  return (
    <Container>
      <Navbar user={user} />
      <MovieInfoComponent movie={movie} />
    </Container>
  );
};

export default MovieDetails;
