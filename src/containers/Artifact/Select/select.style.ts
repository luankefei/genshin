import styled from "@emotion/styled";

export const DropSelect = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 38px;
  box-shadow: 0 0 2px 0 #0007;
  background: white;
  padding: 0 15px;
  border-radius: 3px;
  user-select: none;
  cursor: pointer;

  span {
    flex: 1;
  }

  > i {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-size: 10px 10px;
    background-image: url(/icons/right_arrow.png);
    background-repeat: no-repeat;
    transform: rotate(90deg);
    transition: transform 200ms ease;

    &.show {
      transform: rotate(-90deg);
    }
  }

  ul {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 360px;
    overflow-y: auto;
    background: #f7f7f7;
    box-shadow: 0 0 4px 0 #0007;
    border-radius: 3px;
    z-index: 2;
    display: none;

    &.top {
      top: unset;
      bottom: 100%;
    }
  }
`;

export const Option = styled.li`
  display: flex;
  padding: 10px;
  align-items: center;

  &:hover {
    background: #f0f0f0;
  }

  .value {
    flex: 1;
  }

  .tip {
    color: gray;
    font-style: normal;
  }
`;
