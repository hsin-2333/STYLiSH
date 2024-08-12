import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

import searchIcon from "/src/assets/search.png";

const Search = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1279);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1279);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ keyword: searchQuery });
    navigate(`/index.html?keyword=${encodeURIComponent(searchQuery)}`);
    window.location.reload();
  };

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  //to be refactored in the futture
  return isMobile ? (
    showInput ? (
      <InputWrapper className="input-wrapper-active" onSubmit={handleSubmit}>
        <SearchInput type="search" placeholder="西裝" value={searchQuery} onChange={handleQueryChange} />
        <SearchButton>
          <SearchIcon src={searchIcon} />
        </SearchButton>
      </InputWrapper>
    ) : (
      <SearchButtonMobile onClick={toggleInput}>
        <SearchIcon src={searchIcon} />
      </SearchButtonMobile>
    )
  ) : (
    <InputWrapper onSubmit={handleSubmit}>
      <SearchInput type="search" placeholder="西裝" value={searchQuery} onChange={handleQueryChange} />
      <SearchButton>
        <SearchIcon src={searchIcon} />
      </SearchButton>
    </InputWrapper>
  );
};

const SharedWebIconSize = css`
  width: 44px;
  height: 44px;
`;

const InputWrapper = styled.form`
  width: 214px;
  height: 44px;
  margin-left: auto;
  margin-right: 42px;
  border-radius: 20px;
  border: 1px solid #979797;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;

  input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }

  @media (max-width: 1279px) {
    display: none;

    &.input-wrapper-active {
      position: fixed;
      top: 0;
      right: 5px;
      z-index: 1;
      width: -webkit-fill-available;
      height: 40px;
      display: inline-block;
      align-items: center;
      background-color: #ffffff;
      border: 1px solid #000000;
      margin: 5px 0px 5px 9px;
    }
  }
`;

const SearchInput = styled.input`
  flex: 1;
  line-height: 24px;
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 2rem;
  font-weight: 400;
  align-items: center;
  background-color: transparent;
  padding: 10px 0 5px 20px;

  &::placeholder {
    color: #8b572a;
    line-height: 24px;
  }
  /* @media (max-width: 1279px) {
    display: none;
  } */
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0 10px 0 0;

  @media (max-width: 1279px) {
    display: none;
  }
`;

const SearchButtonMobile = styled.button`
  display: none;
  border: none;
  background: transparent;
  cursor: pointer;
  @media (max-width: 1279px) {
    display: inline-block;
    position: absolute;
    top: 6px;
    right: 16px;
    padding: 0;
    ${SharedWebIconSize};
  }
`;

const SearchIcon = styled.img`
  ${SharedWebIconSize};

  @media (max-width: 1279px) {
    width: 40px;
    height: 40px;
  }
`;

export default Search;
