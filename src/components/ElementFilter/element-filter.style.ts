import styled from "@emotion/styled";

export const Container = styled.div`
  padding-top: 20px;
  margin-bottom: 16px;
  // text-align: center;

  ul {
    justify-content: center;

    li.selected {
      background: rgba(234, 179, 8);
    }
  }
`;

export const Elements = styled.div`
  height: 36px;

  ul {
    display: flex;
    // justify-content: center;

    li {
      flex: 1;
      flex-grow: 0;
      padding: 4px;
      height: 28px;
      border-radius: 6px;
      margin: 0 2px;

      img {
        width: 28px;
        height: auto;
      }
    }
  }
`;
