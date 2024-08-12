import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";

const CategoriesComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <Categories>
        <CategoryItem>
          <CategoryLink href="homepage.html?category=women">女裝</CategoryLink>
        </CategoryItem>
        <CategoryItem>
          <CategoryLink href="homepage.html?category=men">男裝</CategoryLink>
        </CategoryItem>
        <CategoryItem>
          <CategoryLink href="homepage.html?category=accessories">配件</CategoryLink>
        </CategoryItem>
      </Categories>
    </ThemeProvider>
  );
};

const Categories = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  margin-top: 20px;
  width: 451px;
  height: 28px;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 1279px) {
    width: 100%;
    height: 50px;
    margin-top: 0;
    position: absolute;
    top: 52px;
    background-color: #313538;
  }
`;

const CategoryItem = styled.li`
  flex: 1;
  text-align: center;
  align-items: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 5px;
    bottom: 3px;
    height: calc(100% - 8px); 
    width: 1px;
    background-color: #808080;

    @media (max-width: 1279px) {
      top: 0;
      height: 16px;
    }
  }

  &:last-child::after {
    content: none;
  }

`;

const CategoryLink = styled.a`
  display: block; 
  padding: 0 0 0 30px;
  width: 100%;
  height: 100%;

  line-height: 28px;
  letter-spacing: 30px;
  text-decoration: none;
  color: inherit;

  &:hover {
    color: ${(props) => props.theme.hoverColor};
  }

  &.categories-active & {
    color: ${(props) => props.theme.activeColor};
  }

  @media (max-width: 1279px) {
    line-height: 16px;
    font-size: 16px;
    letter-spacing: 0px;
    padding: 0;
    color: ${(props) => props.theme.mediaNavColor};

    &:hover {
      color: ${(props) => props.theme.mediaNavHoverColor};
    }

    &.categories-active {
      color: ${(props) => props.theme.mediaNavActiveColor};
    }
  }
`;

export default CategoriesComponent;
