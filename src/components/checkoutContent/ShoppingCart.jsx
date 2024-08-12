import styled from "styled-components";

import productpic from "../../assets/product-pic.png";
import ProductSelector from "./ProductSelector";
import DeleteButton from "./DeleteButton";

const ShoppingCart = () => {
  return (
    <>
      <ShoppingCartTitle>
        <ShoppingCartTitleText>
          <div>購物車</div>
        </ShoppingCartTitleText>
        <ShoppingCartTitleTexts>
          <div>數量</div>
          <div>單價</div>
          <div>小計</div>
        </ShoppingCartTitleTexts>
      </ShoppingCartTitle>
      <ShoppingCartDetail>
        <ShoppingCartItem>
          <ProductImg src={productpic} />
          <ProductInfo>
            <ProductInfoTitle>前開衩扭結洋裝</ProductInfoTitle>
            <ProductInfoId>201807201824</ProductInfoId>
            <ProductInfoColor>顏色｜白</ProductInfoColor>
            <ProductInfoSize>尺寸｜M</ProductInfoSize>
          </ProductInfo>
          <ProductSelector></ProductSelector>
          <ProductPrice>TWD.799</ProductPrice>
          <ProductPrice>TWD.799</ProductPrice>
          <DeleteButton/>
        </ShoppingCartItem>
        <ShoppingCartItem>
          <ProductImg src={productpic} />
          <ProductInfo>
            <ProductInfoTitle>前開衩扭結洋裝</ProductInfoTitle>
            <ProductInfoId>201807201824</ProductInfoId>
            <ProductInfoColor>顏色｜白</ProductInfoColor>
            <ProductInfoSize>尺寸｜M</ProductInfoSize>
          </ProductInfo>
          <ProductSelector></ProductSelector>
          <ProductPrice>TWD.799</ProductPrice>
          <ProductPrice>TWD.799</ProductPrice>
          <DeleteButton/>
        </ShoppingCartItem>
        <ShoppingCartItem>
          <ProductImg src={productpic} />
          <ProductInfo>
            <ProductInfoTitle>前開衩扭結洋裝</ProductInfoTitle>
            <ProductInfoId>201807201824</ProductInfoId>
            <ProductInfoColor>顏色｜白</ProductInfoColor>
            <ProductInfoSize>尺寸｜M</ProductInfoSize>
          </ProductInfo>
          <ProductSelector></ProductSelector>
          <ProductPrice>TWD.799</ProductPrice>
          <ProductPrice>TWD.799</ProductPrice>
          <DeleteButton/>
        </ShoppingCartItem>
      </ShoppingCartDetail>
    </>
  );
};

const ShoppingCartTitle = styled.div`
  width: 1160px;
  display: flex;
  justify-content: space-evenly;
  padding-right: 46px; //206-160
  margin: auto;
  margin-top: 51px;

  @media (max-width: 1279px) {
    padding: 0;
    margin-left: 24px;
    max-width: 432px;
    width: 100%;
    margin-top: 20px;
  }
`;

const ShoppingCartTitleText = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  text-align: start;
  width: 538px;
  height: 35px;
  display: flex;
`;

const ShoppingCartTitleTexts = styled.div`
  font-size: 16px;
  line-height: 16px;
  margin-right: 160px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  width: 416px; //32*3+160*2

  @media (max-width: 1279px) {
    display: none;
  }
`;

const ShoppingCartDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1160px;
  margin: auto;
  padding: 39px 29px;
  gap: 30px;
  border: 1px solid ${(props) => props.theme.stroke};
  box-sizing: border-box;

  @media (max-width: 1279px) {
    padding: 20px 24px;
    gap: 20px;
    /* border: none; */
  }
`;

const ShoppingCartItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  @media (max-width: 1279px) {
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }
`;

const ProductImg = styled.img`
  width: 114px;
  margin-right: 16px;

  @media (max-width: 1279px) {
    order: 0;
    margin-right: 10px;
    content: url(${(props) => props.mobilesrc});
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 152px;
  align-items: start;
  margin-right: auto;

  @media (max-width: 1279px) {
    order: 0;
    flex: 1;
  }
`;

const ProductInfoTitle = styled.div`
  font-size: 16px;
  line-height: 19px;
  width: 100%;
  color: ${(props) => props.theme.describeText};
  margin-bottom: 18px;
`;

const ProductInfoId = styled(ProductInfoTitle)`
  margin-bottom: 22px;
  font-family: "Noto Sans TC";
`;

const ProductInfoColor = styled(ProductInfoTitle)`
  margin-bottom: 10px;
  width: 64px;
`;
const ProductInfoSize = styled(ProductInfoTitle)`
  width: 61px;
  margin-left: 1px;
  white-space: nowrap;
`;

const ProductPrice = styled(ProductInfoTitle)`
  width: 192px;
  padding: 0;
  margin: 0;
  text-align: center;
  @media (max-width: 1279px) {
    order: 1;
    width: 104px;
  }
`;


export default ShoppingCart;
