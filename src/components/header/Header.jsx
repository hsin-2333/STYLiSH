import styled, { css } from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";

import logo from "/src/assets/logo.png";
import cart from "/src/assets/cart.png";
import cartMobile from "/src/assets/cart-mobile.png";
import member from "/src/assets/member.png";
import memberMobile from "/src/assets/member-mobile.png";

import CategoriesComponent from "./Categories";
import Search from "./Search";
import React, {useContext} from "react";
import { Link } from 'react-router-dom';

import {CartContext} from "../../store/CartContext";

const Header = () => {
  const { cartTotal } = useContext(CartContext);

  return (
    <ThemeProvider theme={theme}>
      <HeaderContainer>
        <LogoLink href="homepage.html">
          <Logo src={logo} />
        </LogoLink>
        <CategoriesComponent />
        <Search />
        <HeaderIcons>
          <HeaderIconsContainer>
            <CartIconContainer>
              <Link to="/checkout">
                <CartIcon src={cart} mobilesrc={cartMobile} alt="cart-mobile" />
                <CartIconQuantity>{cartTotal}</CartIconQuantity>
              </Link>
            </CartIconContainer>
            <Link to="/checkout">
              <IconText >購物車</IconText>          
            </Link>
          </HeaderIconsContainer>
          <HeaderIconsContainer>
            <CartIcon src={member} mobilesrc={memberMobile} alt="profile" />
            <IconText href="#">會員</IconText>
          </HeaderIconsContainer>
        </HeaderIcons>
      </HeaderContainer>
    </ThemeProvider>
  );
};

const SharedWebIconSize = css`
  width: 44px;
  height: 44px;
`;

const HeaderContainer = styled.div`
  height: 140px;
  display: flex;
  align-items: center;
  border-bottom: 40px solid ${(props) => props.theme.mediaBGColor};
  padding: 0 54px 0 60px;
  @media (max-width: 1279px) {
    height: 102px;
    border-bottom: 0;
    padding: 0;
    justify-content: center;
  }
`;

const LogoLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 258px;
  height: 48px;
  margin-right: 57px;
  @media (max-width: 1279px) {
    position: absolute;
    top: 14px;
    width: 129px;
    height: 24px;
    margin-right: 0;
  }
`;


const CartIcon = styled.img`
  ${SharedWebIconSize};
  @media (max-width: 1279px) {
    content: url(${(props) => props.mobilesrc});
  }
`;

const CartIconContainer = styled.div`
  ${SharedWebIconSize};
  position: relative;
`;

const CartIconQuantity = styled.span`
  position: absolute;
  top: 20px; /* 向上偏移 */
  right: 0px; /* 向右偏移*/
  background-color: ${(props) => props.theme.defaultBrown};
  color: #fff;
  border-radius: 50%;
  font-size: 1.6rem;
  min-width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
`;

const HeaderIcons = styled.div`
  width: 130px;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1279px) {
    bottom: 0px;
    position: fixed;
    width: 100%;
    height: 60px;
    z-index: 1000;
    background-color: ${(props) => props.theme.mediaBGColor};
  }
`;

const HeaderIconsContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1279px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      height: 24px;
      width: 1px;
      background-color: #808080;
    }
  }
`;

const IconText = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.mediaNavHoverColor};
  @media (min-width: 1280px) {
    display: none;
  }
`;

export default Header;
