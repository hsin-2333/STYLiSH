import styled from "styled-components";

const AddToCartButton = (props) => {
  return <Button onClick={props.handleAddToCart}>{props.cartPropmt}</Button>;
};

const Button = styled.button`
  background-color: #000;
  color: #fff;
  outline: ${(props) => props.theme.stroke};
  height: 64px;
  cursor: pointer;
  transition: background-color 0.3s;

  font-size: 20px;
  letter-spacing: 4px;
  line-height: 30px;
  &:hover {
    background-color: #555;
  }
  @media (max-width: 1279px) {
    height: 44px;
    font-size: 16px;
    letter-spacing: 3.2px;
    line-height: 30px;
  }
`;

export default AddToCartButton;
