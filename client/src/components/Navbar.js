import styled from "styled-components";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import { useRef } from "react";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #4000ff;
  color: white;
  align-items: center;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 45px;
  height: 35px;
  margin: 5px;
`;

const Name = styled.span`
  font-size: 23px;
  font-weight: 600;
  color: white;
`;

const SearchBar = styled.form`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  width: 50%;
  align-items: center;
`;

// const SearchForm = styled.form``;

const SearchIcon = styled.img`
  width: 30px;
  height: 20px;
`;

const SearchInput = styled.input`
  // color: black;
  color: #282828;
  width: 100%;
  font-size: 15px;
  font-weight: 500;
  border: none;
  outline: none;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  // justify-content: center;
`;

const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin: 5px;
`;

const ProfileName = styled.span`
  font-size: 15px;
  margin-top: 5px;
`;

const LogoutButton = styled.button`
  width: 75px;
  height: 35px;
  border-radius: 5px;
  background-color: white;
  color: #4000ff;
  font-size: 15px;
  font-weight: 550;
  border: none;
  outline: none;
  cursor: pointer;
`;

const Navbar = ({ user }) => {
  const search = useRef();
  const history = useHistory();
  let searchInput;
  function titleCase(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }
  const searchHandler = async (e) => {
    e.preventDefault();
    searchInput = search.current.value;
    const data = titleCase(searchInput);
    console.log(data);
    const res = await axios.get(`/movie/moviename/${data}`);
    console.log(res.data);
    if (res.data === "Movie found")
      history.push(`/${searchInput.toLowerCase()}`);
    else {
      alert(searchInput + " " + res.data);
    }
  };
  const logoutHandler = async () => {
    try {
      await axios.get("/auth/logout");
      history.push("/login");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Header>
      <NavLink to="/" style={{ textDecoration: "inherit" }}>
        <AppName>
          <Logo src="/movie_ticket.png" />
          <Name>TicketShow</Name>
        </AppName>
      </NavLink>
      <SearchBar onSubmit={searchHandler}>
        <SearchIcon src="/search-icon.svg" />
        <SearchInput placeholder="Search Movies" ref={search} />
      </SearchBar>
      <Profile>
        <ProfileIcon src="/profile-icon.png" />
        <ProfileName>{`Hi, ${user.username}`}</ProfileName>
      </Profile>
      <LogoutButton onClick={logoutHandler}>Logout</LogoutButton>
    </Header>
  );
};

export default Navbar;
