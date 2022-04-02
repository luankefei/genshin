import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: rgb(30, 41, 59);
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
  }
`;
