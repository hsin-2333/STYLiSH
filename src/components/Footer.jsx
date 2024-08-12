import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme";

import Line from "/src/assets/line.png";
import Twitter from "/src/assets/twitter.png";
import Facebook from "/src/assets/facebook.png";

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <FooterConatiner>
        <FooterLinks>
          <FooterItem>
            <FooterText href="#">關於 STYLiSH</FooterText>
          </FooterItem>
          <FooterItem>
            <FooterText href="#">服務條款</FooterText>
          </FooterItem>
          <FooterItem>
            <FooterText href="#">隱私政策</FooterText>
          </FooterItem>
          <FooterItem>
            <FooterText href="#">聯絡我們</FooterText>
          </FooterItem>
          <FooterItem>
            <FooterText href="#">FAQ</FooterText>
          </FooterItem>
        </FooterLinks>
        <FooterSocialMedia>
          <li>
            <a href="#">
              <SocialMediaIcon src={Line} alt="line" />
            </a>
          </li>
          <li>
            <a href="#">
              <SocialMediaIcon src={Twitter} alt="twitter" />
            </a>
          </li>
          <li>
            <a href="#">
              <SocialMediaIcon src={Facebook} alt="facebook" />
            </a>
          </li>
        </FooterSocialMedia>
        <FooterRights>© 2018. All rights reserved.</FooterRights>
      </FooterConatiner>
    </ThemeProvider>
  );
};

const FooterConatiner = styled.footer`
  background-color: ${(props) => props.theme.mediaBGColor};
  width: 100%;
  min-height: 115px;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  bottom: 0;

  @media (max-width: 1279px) {
    bottom: 60px;
    flex-wrap: wrap;
    min-height: 146px;
    padding: 23px 0 20px 0;
  }
`;

const FooterLinks = styled.ul`
  display: flex;
  list-style-type: none;
  width: 670px;
  height: 22px;
  padding: 0%;
  margin-right: 101px;
  margin-left: auto;

  @media (max-width: 1279px) {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: 1fr 1fr 1fr;
    list-style-type: none;
    padding: 0px;
    width: 177px;
    height: 76px;
    text-wrap: nowrap;

    row-gap: 4px;
    column-gap: 36px;
    margin: 0 31px 0 0;
  }
`;

const FooterItem = styled.li`
  flex: 1;
  width: 134px;
  text-align: center;
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
  }

  @media (max-width: 1279px) {
    width: 100%;
    text-align: left;

    &::after {
      content: none;
    }
  }
`;

const FooterText = styled.a`
  color: ${(props) => props.theme.footerColor};
  font-size: 16px;
  font-weight: 400;

  @media (max-width: 1279px) {
    font-size: 14px;
    display: block;
  }
`;

const FooterSocialMedia = styled.ul`
  display: flex;
  list-style-type: none;
  padding-inline-start: 0px;
  gap: 30px;
  width: 210px;
  height: 50px;
  margin-right: 30px;

  @media (max-width: 1279px) {
    width: 88px;
    height: auto;
    gap: 14px;
    margin: 0 0 auto 0;
  }
`;

const SocialMediaIcon = styled.img`
  width: 50px;
  height: 50px;

  @media (max-width: 1279px) {
    width: 20px;
    height: 20px;
  }
`;

const FooterRights = styled.span`
  color: ${(props) => props.theme.rightClaimColor};
  display: inline-block;
  font-size: 12px;
  text-align: center;
  width: 149px;
  margin-right: auto;
  @media (max-width: 1279px) {
    width: 100%;
    text-align: center;
    font-size: 10px;
  }
`;

export default Footer;
