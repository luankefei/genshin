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

const primaryColor = "#3694ff";
export const WeightButton = styled.div`
  width: 85px;
  height: 38px;
  display: inline-block;
  border-radius: 3px;
  box-shadow: 0 0 2px 0 #0007;
  line-height: 38px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  position: relative;
  overflow: hidden;
  user-select: none;
  margin: 10px 10px 0 0;

  .blank {
    background: white;
    color: ${primaryColor};
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }

  .fill {
    background: ${primaryColor};
    color: white;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    clip-path: polygon(0 0, 60% 0, 40% 100%, 0 100%);
    transition: clip-path 200ms ease;
  }

  &.one .fill {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }

  &.zero .fill {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  }
`;
