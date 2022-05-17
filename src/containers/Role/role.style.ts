import styled from "@emotion/styled";

export const Page = styled.div`
  padding-top: 80px;

  img {
    width: 240px;
    height: 280px;
  }

  > div {
    font-size: 14px;
    padding-top: 40px;
  }
`;

export const Header = styled.div`
  padding: 0 80px;

  .add-character,
  .clear-character {
    height: 36px;
    border: none;
    font-size: 15px;
    color: #fff;
    padding: 0 20px;
    border-radius: 6px;
    background: #ed4441;
    cursor: pointer;
  }

  .clear-character {
    background: rgb(51, 65, 85);
    margin-left: 20px;
  }

  .element-filter-wrapper {
    // > div {
    //   padding: 0;
    // }

    ul {
      justify-content: flex-start;
    }
  }
`;

export const Container = styled.div`
  padding: 0 80px;

  table {
    width: 100%;
    border-collapse: collapse;

    tr {
      height: 80px;
    }

    th,
    td {
      border: 1px solid #ccc;
      padding: 0 12px;
      text-align: center;

      img {
        width: 60px;
        height: auto;
        margin-right: 20px;
      }

      &.middle span,
      img {
        display: inline-block;
        vertical-align: middle;
        line-height: 80px;
      }

      &.left {
        text-align: left;

        ul {
          padding: 5px 0;
        }

        ul li {
          line-height: 1.5;
        }
      }
    }

    tr td {
      &:not(:first-child):not(:last-child):hover {
        cursor: pointer;
        background: #fff;
      }
    }
  }
`;

export const CharacterModal = styled.div`
  width: 100%;
  height: 100%;
  background: rgb(30, 41, 59);
  // padding: 20px 0;
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

export const ElementFilter = styled.div`
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

export const GroupItem = styled.fieldset`
  background: rgb(51, 65, 85);
  padding-bottom: 12px;
  // border: 0;

  legend {
    box-sizing: border-box;
    height: 64px;
    line-height: 40px;
    padding: 12px 15px;
    color: rgba(14, 165, 233, 1);
    font-weight: bold;
    // width: 100%;
  }

  dl {
    display: flex;

    dt,
    dd {
      flex: 1;
    }
  }

  .icon {
    float: left;
    width: 40px;
    max-height: 40px;
    margin-left: -10px;
  }
`;

// export default { Page, CharacterModal, Characters, Elements };
