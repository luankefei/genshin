import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  color: #808080;
  align-items: center;
  margin-top: 24px;
  padding: 0 40px;

  > span {
    flex: 1;
    font-weight: bold;
  }

  .section-opts {
    > * {
      color: #3694ff;
      cursor: pointer;
      font-size: 12px;
      margin-left: 10px;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
