import styled from "styled-components";

const PaymentInfo = () => {
  return (
    <PaymentInfoContainer>
      <InfoContent>
        <InfoTitle>訂購資料</InfoTitle>
        <DevideLine />
        <NoteContainer>
          <RowNomargin>
            <InfoText>收件人姓名</InfoText>
              <Input type="text" />
          </RowNomargin>
          <Note>務必填寫完整收件人姓名，避免包裹無法順利簽收</Note>
        </NoteContainer>

        <Row>
          <InfoText>手機</InfoText>
          <Input type="text" />
        </Row>
        <Row>
          <InfoText>地址</InfoText>
          <Input type="text" />
        </Row>
        <Row>
          <InfoText>Email</InfoText>
          <Input type="email" />
        </Row>
        <RowHeight26>
          <InfoText>配送時間</InfoText>
          <RatioRow>
            <Ratio>
              <RatioInput type="radio" name="timeline1" />
              <Label>08:00-12:00</Label>
            </Ratio>
            <Ratio>
              <RatioInput type="radio" name="timeline2" />
              <Label>14:00-18:00</Label>
            </Ratio>
            <Ratio>
              <RatioInput type="radio" name="timelineFree" />
              <Label>不指定</Label>
            </Ratio>
          </RatioRow>
        </RowHeight26>
      </InfoContent>
      <InfoContent>
        <InfoTitle>付款資料</InfoTitle>
        <DevideLine2 />
        <Row>
          <InfoText>信用卡號碼</InfoText>
          <Input type="text" placeholder="**** **** **** ****"/>
        </Row>
        <Row>
          <InfoText>有效期限</InfoText>
          <Input type="text" placeholder="MM / YY" />
        </Row>
        <Row>
          <InfoText>安全碼</InfoText>
          <Input type="text" placeholder="後三碼" />
        </Row>
      </InfoContent>
    </PaymentInfoContainer>
  );
};
const PaymentInfoContainer = styled.div`
  width: 1160px;
  height: 659px;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 49px;
  gap: 20px;

  @media (max-width: 1279px) {
    width: 100%;
    margin-bottom: 24px;
    height: fit-content;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 696px;
  height: 32px;
  margin-bottom: 30px;

  @media (max-width: 1279px) {
    max-width: 432px;
    width: 100%;
  }
`;

const RowNomargin = styled(Row)`
  margin-bottom: 0;
`;
const RowHeight26 = styled(Row)`
  height: 26px;
  
  @media (max-width: 1279px) {
    flex-direction: column;
    align-items: start;
    gap: 10px;
  }
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 8px;
  height:32px;
  width: 100%;
  flex: 1;
  padding: 0px 5px; /* 添加內邊距確保文字不貼邊 */


  &::placeholder{
    color: #D3D3D3;
    font-size: 16px;
    line-height: 32px;
    vertical-align: top;
    height: 30px;
    font-family: "Noto Sans TC";
    padding-left: 2px; /* 調整左邊距 */
    transform: translateY(2px); 
  }
`;

const RatioRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 32px;
`;

const RatioInput = styled.input`
  height: 16px;
  width: 16px;
  padding-top: 5px;
  padding-right: 8px;
  margin: 0 ;
`;

const InfoTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  text-align: start;
  display: flex;
  transform: translateY(1px); 
`;

const InfoContent = styled.div`
  width: 1160px;
  height: fit-content;
  align-items: start;
  display: flex;
  flex-direction: column;
  margin-right: auto;

  @media (max-width: 1279px) {
    max-width: 432px;
    width: 100%;
    margin: 20px 24px;
  }
`;
const InfoText = styled.div`
  font-family: "Noto Sans TC";
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: left;
  width: 120px;
`;

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 696px;

  @media (max-width: 1279px) {
    max-width: 432px;
    width: 100%;
  }
`;

const Note = styled.span`
  color: ${(props) => props.theme.defaultBrown};
  font-size: 16px;
  line-height: 19px;
  margin: 10px 0 30px 0;
  text-align: right;

  @media (max-width: 1279px) {
    width: 100%;
    text-align: left;
  }
`;

const Ratio = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.label`
  font-family: "Noto Sans TC";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  width: 86px;
  text-align: left;
  white-space: nowrap;
`;

const DevideLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #3f3a3a;
  margin-top: 16px;
  margin-bottom: 25px;
`;

const DevideLine2 = styled(DevideLine)`
  margin-bottom: 24px;

`;
export default PaymentInfo;
