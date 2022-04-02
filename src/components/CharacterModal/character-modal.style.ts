import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: rgb(30, 41, 59);
  // padding: 20px 0;
`;

export const Characters = styled.div`
  padding: 0 20px 20px;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    li {
      width: 96px;
      flex: 1;
      margin: 5px;
      text-align: center;
      flex-grow: 0;
      cursor: pointer;

      &.selected {
        outline: 1px solid #ed4441;
        border-radius: 6px;
      }

      .character-bg-5,
      .character-bg-4 {
        border-radius: 6px;
        overflow: hidden;
        background-image: linear-gradient(to bottom right, #d2832a 20%, #5a3911 85%, rgba(210, 131, 42, 0));
      }

      .character-bg-4 {
        background-image: linear-gradient(to bottom right, #7b4faf 20%, #251e4c 85%, rgba(123, 79, 175, 0));
      }

      img {
        width: 80px;
        height: auto;
      }

      span {
        color: rgb(226, 232, 240);
        line-height: 22px;
      }
    }
  }
`;

export const CharacterDetail = styled.div`
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

export const Item = styled.dl`
  background: rgb(51, 65, 85);
  padding-bottom: 12px;

  section {
    border-radius: 6px;
    overflow: hidden;
    margin: 0 12px;

    &.center {
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
      margin-left: -10px;
      margin-right: 10px;
    }
  }

  dt,
  dd {
    box-sizing: border-box;
    height: 64px;
    line-height: 40px;
    padding: 12px 15px;
  }

  dt {
    color: rgba(14, 165, 233, 1);
    font-weight: bold;
    // color: rgba(255, 255, 255, 0.87);
  }

  dd {
    text-align: right;
    background: rgb(100, 116, 139);
    color: rgba(255, 255, 255, 0.87);
    // margin: 0 12px;
    // border-bottom: rgb(100, 116, 139);
    border-bottom: 1px solid #475569;

    &.multi {
      > div {
        cursor: pointer;
      }

      input {
        width: 40px;
      }
    }

    &.artifact {
      cursor: pointer;
    }

    span {
      float: left;
      font-size: 16px;
    }

    input {
      padding: 0 10px;
      text-align: right;
      height: 36px;
      background: transparent;
      border-radius: 6px;
      color: rgba(255, 255, 255, 0.87);
      border: 2px solid transparent;

      &:focus {
        border-color: #cf95d9;
      }

      &::after {
        content: "\e6b5";
        color: rgb(187, 187, 187);
        font-size: 16px;
        padding: 0 10px;
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  .confirm {
    width: 94px;
    height: 36px;
    background: rgba(249, 115, 22, 1);
    color: rgba(255, 255, 255, 0.87);
    border-radius: 6px;
    font-size: 16px;
  }
`;
