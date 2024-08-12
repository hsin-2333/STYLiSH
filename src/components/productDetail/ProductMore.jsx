import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import styled from "styled-components";

const ProductMore = (props) => {
  const moreImages = props.moreImages || [];
  return (
    <MoreProductInfoContainer>
      <MoreInfoWrapper>
        <MoreProductInfoTitle>更多產品資訊</MoreProductInfoTitle>
        <DevideLine />
      </MoreInfoWrapper>
      <MoreProductInfoText>{props.story}</MoreProductInfoText>
      {moreImages.map((image, index) => (
        <ProductMorePic key={index} src={image} alt="product-pic+${index}" />
      ))}
    </MoreProductInfoContainer>
  );
};

const MoreProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 1279px) {
    padding: 0 24px;
  }
`;

const MoreInfoWrapper = styled.div`
  display: flex;
  gap: 64px;
  height: 30px;
  align-items: center;

  @media (max-width: 1279px) {
    gap: 35px;
  }
`;

const MoreProductInfoText = styled.p`
  font-size: 20px;
  line-height: 30px;
  color: ${(props) => props.theme.describeText};

  @media (max-width: 1279px) {
    font-size: 14px;
    line-height: 25px;
    margin: 0;
  }
`;

const ProductMorePic = styled.img`
  width: auto;
  height: 100%;
`;

const MoreProductInfoTitle = styled.div`
  font-size: 20px;
  line-height: 30px;
  white-space: nowrap;
  display: inline-block;
  color: ${(props) => props.theme.defaultBrown};

  @media (max-width: 1279px) {
    font-size: 16px;
    line-height: 30px;
    letter-spacing: 3.2px;
  }
`;

const DevideLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #3f3a3a;
`;

export default ProductMore;
