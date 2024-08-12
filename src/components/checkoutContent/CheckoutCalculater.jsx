import styled from "styled-components";

const CheckoutCalculater = () => {
  return (
    <CheckoutContainer>
      <CheckoutCalculateContainer>
        <PriceText3px>
          總金額 <div><PriceLabel>NT.</PriceLabel><Price>2397</Price></div>
        </PriceText3px>
        <PriceText3px>
          運費 <div><PriceLabel>NT.</PriceLabel><Price>30</Price></div>
        </PriceText3px>
        <DevideLine />
        <PriceText>
          應付金額 <div><PriceLabel>NT.</PriceLabel><Price>2427</Price></div>
        </PriceText>
      </CheckoutCalculateContainer>
      <CheckoutButton>確認付款</CheckoutButton>
    </CheckoutContainer>
  );
};


const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 1160px;
  align-items: end;
  margin-top: 10px;
  margin-bottom: 148px;

  @media (max-width: 1279px) {
    max-width: 432px;
    width: 100%;
    margin: 0 24px 26px 24px;
  }
`;


const PriceText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
`;

const PriceText3px = styled(PriceText)`
    margin-right: 3px;
`;

const PriceLabel = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  margin-right: 9px;
  margin-top: 10px;
  display: inline-block;
  vertical-align: top;
`;

const CheckoutCalculateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  gap: 20px;
`;

const DevideLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #3f3a3a;
`;

const Price = styled.span`
    font-size: 30px;
    font-weight: 400;
    line-height: 36px;
    text-align: left;
    color: #3F3A3A;
`

const CheckoutButton = styled.button`
    background-color: #000000;
    width: 240px;
    height: 64px;
    margin-top: 50px;
    border: none;

    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 4px;
    color: #ffffff;
    padding: 19px 74px;
    white-space: nowrap;

    @media (max-width: 1279px) {
        width: 100%;
        margin-bottom: 170px;
    }
`;
export default CheckoutCalculater;
