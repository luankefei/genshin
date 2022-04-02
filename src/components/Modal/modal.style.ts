import styled from "@emotion/styled";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 100px;
  transform: translate(-50%, 0);
  background: transparent;
  width: 550px;
  max-height: calc(100% - 200px);
  flex-direction: column;
  overflow: auto;
  z-index: 5;

  @media (max-width: 500px) {
    left: 0px;
    margin: 0px 10px;
  }
`;

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: transparent;

  img {
    width: 17px;
  }
`;

export { Wrapper, Container, CloseButton };
