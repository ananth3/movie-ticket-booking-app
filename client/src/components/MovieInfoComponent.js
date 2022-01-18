import { PlayArrow, Favorite } from "@material-ui/icons";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
// import MovieComponent from "./MovieComponent";
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovieInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  // background-image: linear-gradient(
  //   90deg,
  //   rgb(34, 34, 34) 24.97%,
  //   rgb(34, 34, 34) 38.3%,
  //   rgba(34, 34, 34, 0.04) 97.47%,
  //   rgb(34, 34, 34) 100%
  // );
  // var(--img);
  // url(/master-bg.jpg);
`;

const PositionContainer = styled.div`
  position: relative;
`;

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
`;

const CoverImg = styled.img`
  object-fit: cover;
  height: 362px;
`;

const TrailerLink = styled.a``;

const Trailercontainer = styled.div`
  position: absolute;
  background-color: rgba(34, 34, 34, 0.8);
  z-index: 1;
  top: 50%;
  left: 50%;
  display: flex;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  border-radius: 18px;
  cursor: pointer;
  width: 22%;
  height: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 8px;
`;

const TrailerPlay = styled.span`
  color: white;
  font-size: 12px;
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px;
`;

const MovieTitle = styled.span`
  font-size: 38px;
  font-weight: 600;
  color: white;
  margin: 20px 0;
  margin-top: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

const MovieRating = styled.span`
  font-size: 17px;
  font-weight: 600;
  color: white;
  margin: 0px 7px;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

const MovieDetailsPattern = styled.div`
  display: flex;
  flex-direction: row;
`;

const MovieDetails = styled.span`
  font-size: 20px;
  font-weight: 550;
  color: white;
  margin: 15px 0;
  margin-right: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

const BookTicketButton = styled.button`
  width: 190px;
  height: 50px;
  margin: 15px 0;
  border-radius: 15px;
  color: white;
  // font-size: 20px;
  font-weight: 550;
  background-color: #f84464;
  border: none;
  font-size: 15px;
  cursor: pointer;
`;

const AboutMovie = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 35px;
  margin-bottom: 15px;
  max-width: 60%;
`;

const AboutTitle = styled.span`
  font-size: 25px;
  font-weight: 600;
  color: black;
  margin: 25px 0;
`;

const AboutMovieDesc = styled.span`
  font-size: 15px;
`;

const MovieInfoComponent = ({ movie }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();
  const movieName = movie.data?.name.toLowerCase();
  const buttonHandler = () => {
    history.push(`/buy-ticket/${movieName}`);
  };

  const [movies, setMovies] = useState({});
  useEffect(() => {
    axios
      .get("/movie/61bc271716ee437d4fbac0b3")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log("Error in movie data");
      });
  }, []);

  return (
    <Container>
      <MovieInfoContainer
        style={{
          background: `linear-gradient(
            90deg,
            rgb(34, 34, 34) 24.97%,
            rgb(34, 34, 34) 38.3%,
            rgba(34, 34, 34, 0.04) 97.47%,
            rgb(34, 34, 34) 100%
          ),url(${PF + "/" + movie.data?.bgImg})`,
        }}
      >
        <PositionContainer>
          <MovieContainer>
            <CoverImg src={PF + `/${movie.data?.img}`} />
          </MovieContainer>
          <TrailerLink href={movie.data?.trailerLink} target="_blank">
            <Trailercontainer>
              <PlayArrow style={{ color: "white" }} />
              <TrailerPlay>Trailer</TrailerPlay>
            </Trailercontainer>
          </TrailerLink>
        </PositionContainer>
        <MovieInfo>
          <MovieTitle>{movie.data?.name}</MovieTitle>
          <MovieDetailsPattern>
            <Favorite style={{ color: "red" }} />
            <MovieRating>{`${movie.data?.rating} likes`}</MovieRating>
          </MovieDetailsPattern>
          <MovieDetailsPattern>
            <MovieDetails>{movie.data?.screenType}</MovieDetails>
            <MovieDetails>{movie.data?.language}</MovieDetails>
          </MovieDetailsPattern>
          <MovieDetailsPattern>
            <MovieDetails>{movie.data?.runtime}</MovieDetails>
            <MovieDetails>{movie.data?.genre}</MovieDetails>
          </MovieDetailsPattern>
          <MovieDetails>{movie.data?.releaseDate}</MovieDetails>
          <BookTicketButton onClick={buttonHandler}>
            Book tickets
          </BookTicketButton>
        </MovieInfo>
      </MovieInfoContainer>
      <AboutMovie>
        <AboutTitle>About the movie</AboutTitle>
        <AboutMovieDesc>{movie.data?.about}</AboutMovieDesc>
      </AboutMovie>
    </Container>
  );
};
export default MovieInfoComponent;
