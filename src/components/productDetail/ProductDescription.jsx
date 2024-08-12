import styled from "styled-components";

import ProductOptions from "./ProductOptions";

const ProductDescription = (props) => {
  return (
    <DescriptionContainer>
      <ProductMainPic src={props.img} alt="product-pic" />
      <DescriptionTextContainer>
        <DescriptionTitle>{props.title}</DescriptionTitle>
        <DescriptionCaption>{props.id}</DescriptionCaption>
        <Price>TWD.{props.price}</Price>
        <DevideLine />
        <ProductOptions colors={props.colors} sizes={props.sizes} variants={props.variants} />
        <DescriptionText>
          {props.note}
          <br />
          {props.texture}
          <br />
          <br />
          {props.description}
          <br />
          清洗：{props.wash}
          <br />
          產地：{props.place}
        </DescriptionText>
      </DescriptionTextContainer>
    </DescriptionContainer>
  );
};
const DescriptionContainer = styled.div`
  display: flex;
  margin: 65px auto;
  gap: 40px;
  align-items: center;
  height: 764px;

  @media (max-width: 1279px) {
    flex-direction: column;
    margin-top: 0;
    height: auto;
    gap: 0px;
    margin: 0;
  }
`;

const ProductMainPic = styled.img`
  width: 560px;

  @media (max-width: 1279px) {
    width: 100%;
  }
`;

const DescriptionTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  height: 100%;
  gap: 20px;

  @media (max-width: 1279px) {
    width: 100%;
    padding: 17px 24px;
  }
`;

const DescriptionTitle = styled.p`
  font-size: 32px;
  letter-spacing: 6.4px;
  line-height: 38px;
  margin: 0;
  color: ${(props) => props.theme.describeText};

  @media (max-width: 1279px) {
    font-size: 20px;
    line-height: 24px;
  }
`;

const DescriptionCaption = styled.span`
  font-size: 20px;
  letter-spacing: 4px;
  line-height: 24px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.productID};

  @media (max-width: 1279px) {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 3.2px;
    margin-bottom: 0px;
  }
`;

const Price = styled.span`
  font-size: 30px;
  letter-spacing: 0px;
  line-height: 36px;
  margin-top: 20px;

  @media (max-width: 1279px) {
    font-size: 20px;
    line-height: 2px;
  }
`;

const DescriptionText = styled.p`
  font-size: 20px;
  letter-spacing: 0px;
  line-height: 30px;
  color: ${(props) => props.theme.describeText};
  white-space: break-spaces;

  @media (max-width: 1279px) {
    font-size: 14px;
    line-height: 24px;
    margin: 0;
  }
`;

const DevideLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #3f3a3a;
  margin-bottom: 10px;
`;

export default ProductDescription;
