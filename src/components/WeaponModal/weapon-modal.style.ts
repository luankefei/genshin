import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: rgb(30, 41, 59);
  // padding: 20px 0;
`;

export const WeaponModalDetail = styled.div`
  .header {
    box-sizing: border-box;
    padding: 8px 24px;
    height: 72px;
    background-size: 100% auto;
    background-position: 0 center;

    img {
      height: 100%;
      margin-right: 12px;
    }

    span {
      line-height: 56px;
      font-weight: bold;
      font-size: 1.125rem;
      color: #fff;
      vertical-align: top;
    }
  }
`;

export const WeaponList = styled.ul`
  background: rgb(51, 65, 85);
  // padding-bottom: 12px;

  li {
    box-sizing: border-box;
    height: 64px;
    line-height: 40px;
    padding: 12px 15px;
    margin: 0 20px;
    overflow: hidden;
    border-bottom: 1px solid rgb(100, 116, 139);
    color: rgba(255, 255, 255, 0.87);
    cursor: pointer;

    .character-bg-5,
    .character-bg-4 {
      border-radius: 6px;
      overflow: hidden;
      background-image: linear-gradient(to bottom right, #d2832a 20%, #5a3911 85%, rgba(210, 131, 42, 0));
    }

    .character-bg-4 {
      background-image: linear-gradient(to bottom right, #7b4faf 20%, #251e4c 85%, rgba(123, 79, 175, 0));
    }

    .character-bg-3 {
      background-image: linear-gradient(to bottom right, #4584bf 20%, #132352 85%, rgba(69, 132, 191, 0));
    }

    . &.center {
      text-align: center;
    }

    &.last {
      padding-top: 10px;
      padding-bottom: 15px;
    }

    .icon {
      float: left;
      width: 40px;
      max-height: 40px;
      margin-right: 12px;
    }
  }
`;
