import styled from "@emotion/styled";

export const Container = styled.div``;

export const Uploader = styled.div`
  margin-top: 24px;

  #select-file {
    display: none;
  }
`;

export const WeightSection = Uploader;

export const UploadMessage = styled.p`
  margin-top: 10px;
  font-weight: bold;
  font-size: 16px;
  color: #66c238;
`;

export const SectionContent = styled.div`
  margin-top: 24px;
  padding: 0 50px;

  .button {
    width: 85px;
    height: 38px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background: #3694ff;
    border-radius: 3px;
    box-shadow: 0 0 2px #0007;
    line-height: 38px;
    text-align: center;
    cursor: pointer;
    user-select: none;
    display: inline-block;
  }
`;
