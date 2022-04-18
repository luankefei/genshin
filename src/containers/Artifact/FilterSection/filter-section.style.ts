import styled from "@emotion/styled";

export const Container = styled.div``;

export const Filter = styled.dl`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

export const FilterTitle = styled.dt`
  width: 100px;
  font-size: 16px;
  font-weight: bold;
  color: #444;
`;

export const FilterDetail = styled.dd`
  width: 300px;

  .rangeslider-horizontal {
    height: 6px;
  }

  .rangeslider-horizontal .rangeslider__handle {
    width: 20px;
    height: 20px;
  }

  .rangeslider-horizontal .rangeslider__handle:after {
    display: none;
  }
`;
