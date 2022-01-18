import styled from "styled-components";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #e8e8e8;
  //   align-items: center;
  //   justify-content: center;
`;

const MovieWrapper = styled.div`
  // display: flex;
  background-color: #e8e8e8;
  width: 50%;
  height: 100%;
  // justify-content: center;
`;

const MovieContainer = styled.div`
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
  font-weight: 600;
  color: black;
  // white-space: nowrap;
  // text-overflow: ellipsis;
  overflow: hidden;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBar = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  background-color: white;
  border-radius: 8px;
  width: 70%;
  height: 30px;
  padding: 10px;
  align-items: center;
`;

const Input = styled.input`
  font-weight: 400;
  border: none;
  outline: none;
  //   padding-left: 6px;
  width: 100%;
`;

const Button = styled.button`
  width: 85px;
  height: 38px;
  margin: 5px 0;
  border-radius: 8px;
  background-color: #00308f;
  color: white;
  font-size: 15px;
  font-weight: 600;
  border: none;
  outline: none;
`;

const Text = styled.span`
  font-size: 15px;
  margin-right: 10px;
`;

const Label = styled.label``;

const ChangeMovie = (props) => {
  const moviename = useRef();
  const trailerLink = useRef();
  const rating = useRef();
  const screenType = useRef();
  const language = useRef();
  const genre = useRef();
  const runtime = useRef();
  const releaseDate = useRef();
  const about = useRef();
  const history = useHistory();
  const [file, setFile] = useState(null);
  const [bgImgFile, setBgImgFile] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newMovie = {
      name: moviename.current.value,
      trailerLink: trailerLink.current.value,
      rating: rating.current.value,
      screenType: screenType.current.value,
      language: language.current.value,
      genre: genre.current.value,
      runtime: runtime.current.value,
      releaseDate: releaseDate.current.value,
      about: about.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newMovie.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    if (bgImgFile) {
      const data = new FormData();
      const fileName = Date.now() + bgImgFile.name;
      data.append("name", fileName);
      data.append("file", bgImgFile);
      newMovie.bgImg = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.put("/movie/61bc271716ee437d4fbac0b3", newMovie);
      await axios.get("/ticket/reset/all-tickets");
      await axios.get("/seat/reset/all-seats");
      history.push("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <MovieWrapper>
        <MovieContainer>
          <LogoContainer>
            <Logo>Change Movie</Logo>
          </LogoContainer>
          <Form onSubmit={submitHandler}>
            <InputBar>
              <Input placeholder="Movie name" ref={moviename} required />
            </InputBar>
            <InputBar>
              <Text>Movie image</Text>
              <Label htmlFor="file">
                <Input
                  placeholder="Movie image"
                  type="file"
                  id="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </Label>
            </InputBar>

            <InputBar>
              <Text>Movie bg-image</Text>
              <Label htmlFor="file">
                <Input
                  placeholder="Movie image"
                  type="file"
                  id="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => setBgImgFile(e.target.files[0])}
                  required
                />
              </Label>
            </InputBar>

            <InputBar>
              <Input placeholder="Trailer link" ref={trailerLink} required />
            </InputBar>
            <InputBar>
              <Input placeholder="Rating" ref={rating} required />
            </InputBar>
            <InputBar>
              <Input placeholder="Screen type" ref={screenType} required />
            </InputBar>
            <InputBar>
              <Input placeholder="Language" ref={language} required />
            </InputBar>
            <InputBar>
              <Input placeholder="Genre" ref={genre} required />
            </InputBar>
            <InputBar>
              <Input placeholder="Runtime" ref={runtime} required />
            </InputBar>
            <InputBar>
              <Input placeholder="Release date" ref={releaseDate} required />
            </InputBar>
            <InputBar>
              <Input placeholder="About" ref={about} required />
            </InputBar>
            <Button>Confirm</Button>
          </Form>
        </MovieContainer>
      </MovieWrapper>
    </Container>
  );
};

export default ChangeMovie;
