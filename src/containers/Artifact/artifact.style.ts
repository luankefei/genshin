import styled from "@emotion/styled";

export const Page = styled.div`
  padding-top: 80px;
`;

export const Header = styled.div`
  padding: 0 80px;
`;

export const Container = styled.div`
  padding: 0 80px;
`;

export const ArtifactList = styled.div`
  margin-right: 500px;
  display: flex;
  background: red;

  ul {
    display: flex;
    flex-flow: wrap;
    justify-content: space-evenly;

    > * {
      margin: 10px;
    }
  }
`;

export const SideBar = styled.aside`
  position: fixed;
  top: 120px;
  right: 0;
  width: 500px;
  background: #f5f5f5;
`;
