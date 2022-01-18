import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;

const CoverImg = styled.img`
  object-fit: cover;
  height: 362px;
`;

const MovieName = styled.span`
  margin: 15px 0;
  font-size: 18px;
  font-weight: 600;
  color: black;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Genre = styled.span`
  font-size: 15px;
  font-weight: 550;
  color: gray;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const EditButton = styled.button`
  width: 60px;
  height: 25px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  border-radius: 6px;
  background-color: blue;
  outline: none;
  border: none;
`;

const MovieComponent = ({ movie }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <MovieContainer>
      <CoverImg src={PF + `/${movie.data?.img}`} />
      <MovieName>{movie.data?.name}</MovieName>
      <Genre>{movie.data?.genre}</Genre>
    </MovieContainer>
  );
};

export default MovieComponent;
