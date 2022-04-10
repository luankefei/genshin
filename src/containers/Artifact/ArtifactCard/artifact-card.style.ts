import styled from "@emotion/styled";

const tag = `
  line-height: 1;
  padding: 1px 4px;
  border-radius: 3px;
  background-color: black;
  color: white;
`;

export const Container = styled.li`
  position: relative;
  width: 200px;
  height: 240px;
  background: #eae4d9;
  font-size: 12px;
  font-weight: bold;
  word-break: keep-all;
  box-shadow: 0 0 2px 0 #0007;
  border-radius: 3px;
  user-select: none;

  * {
    box-sizing: border-box;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100px;
  background: rgb(102, 87, 88);
  background: linear-gradient(165deg, rgba(102, 87, 88, 1) 0%, rgba(214, 169, 90, 1) 100%);

  .head-stat {
    display: flex;
    flex-direction: column;
    // box-sizing: border-box;
    width: 100px;
    padding: 10px 15px;
    color: white;

    .piece-name {
      flex: 1;
      white-space: nowrap;
      z-index: 1;
    }

    .main-affix-name {
      color: #fff7;
      font-size: 10px;
    }

    .main-affix-value {
      font-size: 18px;
    }
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;

  .body-head {
    display: flex;
    padding: 8px 12px;
    align-items: center;

    .level {
      ${tag}
      background-color: #333;
    }

    .cur-an {
      ${tag}
      background-color: #66c238;
      margin-left: 5px;
    }

    .lock-img-container {
      flex: 1;
      text-align: right;
      line-height: 0;

      img {
        width: 20px;
        height: 20px;
        cursor: pointer;

        &.disabled {
          cursor: default;
        }
      }
    }
  }

  .minor-affixes {
    color: #333;
    padding: 0 15px;
  }

  .affix-numbers {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 20px;
    color: white;
    text-align: center;
    line-height: 20px;
    display: flex;

    .min-an {
      background: #a6a6a6;
      width: 33.3%;
    }

    .avg-an {
      background: #2a82e4;
      width: 33.3%;
    }

    .max-an {
      background: #ff5733;
      width: 33.3%;
    }
  }

  .full-an {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 20px;
    color: white;
    text-align: center;
    line-height: 20px;
    background: #66c238;
  }
`;
