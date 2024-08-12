import styled from "styled-components";
import selector from "../../assets/selector.png";

const ProductSelector = () => {
  return (
    <ProductSelectorContainer>
      <SelectContent defaultValue="value1">
        <SelectOption value="value1">1</SelectOption>
        <SelectOption value="value2">2</SelectOption>
        <SelectOption value="value3">3</SelectOption>
      </SelectContent>
    </ProductSelectorContainer>
  );
};

const ProductSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-right: 56px;

  @media (max-width: 1279px) {
    order: 1;
    margin-left: 12px;
    margin-right: 52px;
  }
`;

const SelectContent = styled.select`
  background-image: url(${selector});
  padding: 8px 16px;
  /* background-color: ${(props) => props.theme.selectorBG}; */
  color: ${(props) => props.theme.describeText};
  font-size: 14px;
  line-height: 16px;
  appearance: none;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  width: 80px;
  height: 32px;
  &:focus {
    outline: none;
  }
`;

const SelectOption = styled.option``;

export default ProductSelector;
