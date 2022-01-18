import styled from "styled-components";

const AlertContainer = styled.div`
  padding: 20px;
  background-color: #04aa6d;
  color: white;
`;

const CloseBtn = styled.span`
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
`;

const Alertbox = (props) => {
  return (
    <AlertContainer>
      <CloseBtn onClick="this.parentElement.style.display='none';">
        &times;
      </CloseBtn>
      Your ticket booked successfully
    </AlertContainer>
  );
};

export default Alertbox;
