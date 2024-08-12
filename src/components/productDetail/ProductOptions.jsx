import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../store/CartContext";

import AddToCartButton from "./AddToCartButton";

const ProductOptions = (props) => {
  const { updateCartTotal } = useContext(CartContext);
  const productVariants = props.variants;
  console.log("variant=" + JSON.stringify(productVariants));

  const [currentAddToCartQuantity, setcurrentAddToCartQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [inStockSizes, setInStockSizes] = useState([]);
  const [upperStockLimit, setUpperStockLimit] = useState(10);
  const [lowerStockLimit, setLowerStockLimit] = useState(0);
  const [chosenProductDetails, setChosenProductDetails] = useState(() => {
    const savedDetails = localStorage.getItem("chosenProductDetails");
    return savedDetails ? JSON.parse(savedDetails) : [];
  });
  const [cartPropmt, setCartPrompt] = useState("請選擇顏色");

  useEffect(() => {
    if (selectedColor) {
      const inStock = productVariants
        .filter((variant) => variant.color_code === selectedColor && variant.stock > 0)
        .map((variant) => {
          const chosenProduct = chosenProductDetails.find(
            (detail) => detail.color === selectedColor && detail.size === variant.size
          );
          const availableStock = chosenProduct ? variant.stock - chosenProduct.quantity : variant.stock;
          return availableStock > 0 ? variant.size : null;
        })
        .filter(Boolean);

      console.log("inStock=" + inStock);
      setInStockSizes(inStock);
      setCartPrompt("請選擇尺寸");

      setSelectedSize(null);
      setcurrentAddToCartQuantity(0);
    }
  }, [selectedColor, productVariants]);

  //選擇了尺寸顏色後設置庫存上限
  useEffect(() => {
    if (selectedColor && selectedSize) {
      const selectedVariant = productVariants.find(
        (variant) => variant.color_code === selectedColor && variant.size === selectedSize
      );
      if (selectedVariant) {
        const chosenProduct = chosenProductDetails.find(
          (detail) => detail.color === selectedColor && detail.size === selectedSize
        );
        const availableStock = chosenProduct ? selectedVariant.stock - chosenProduct.quantity : selectedVariant.stock;
        setUpperStockLimit(availableStock);
        if (availableStock === 0) {
          setcurrentAddToCartQuantity(0);
          inStockSizes.splice(inStockSizes.indexOf(selectedSize), 1);
        }
        console.log("availableStock 庫存數量=" + availableStock);
      }
      setCartPrompt(currentAddToCartQuantity ? "加入購物車" : "請選擇數量");
    }
  }, [selectedColor, selectedSize, productVariants, chosenProductDetails]);

  //添加購物車後更新庫存上限
  useEffect(() => {
    if (chosenProductDetails && chosenProductDetails.length > 0) {
      const lastAddedProduct = chosenProductDetails[chosenProductDetails.length - 1];
      setUpperStockLimit(lastAddedProduct.stock);
      console.log("最新添加商品庫存" + lastAddedProduct.stock);
      setCartPrompt("請選擇顏色");
      setSelectedColor(null);
      setSelectedSize(null);
      setInStockSizes([]);
      setcurrentAddToCartQuantity(0);
    }
  }, [chosenProductDetails]);

  const handleChangeQuantity = (delta) => {
    if (selectedColor != null && selectedSize != null) {
      console.log("changeQuantity, limit=" + upperStockLimit);
      setcurrentAddToCartQuantity((prevQuantity) => {
        const currentQuantity = prevQuantity + delta;
        console.log("currentQuantity=" + currentQuantity, "upper=" + upperStockLimit, delta);
        return Math.min(Math.max(currentQuantity, lowerStockLimit), upperStockLimit);
      });
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor) {
      alert("請選擇顏色");
      return;
    } else if (!selectedSize) {
      alert("請選擇尺寸");
      return;
    } else if (currentAddToCartQuantity === 0) {
      alert("請選擇數量");
      return;
    } else {
      setChosenProductDetails((prevDetails) => {
        const existedProductIndex = prevDetails.findIndex(
          (detail) => detail.color === selectedColor && detail.size === selectedSize
        );

        const selectedVariantIndex = productVariants.findIndex(
          (variant) => variant.color_code === selectedColor && variant.size === selectedSize
        );

        console.log("selectedVariantIndex=" + selectedVariantIndex);

        let updatedDetails;
        if (existedProductIndex !== -1) {
          const newQuantity = prevDetails[existedProductIndex].quantity + currentAddToCartQuantity;
          const newStock = productVariants[selectedVariantIndex].stock - newQuantity;

          if (newStock < 0) {
            alert("庫存不足");
            return prevDetails;
          }
          updatedDetails = [...prevDetails];
          updatedDetails[existedProductIndex] = {
            ...updatedDetails[existedProductIndex],
            quantity: newQuantity,
            stock: newStock,
          };
        } else {
          const newQuantity = currentAddToCartQuantity;
          const newStock = productVariants[selectedVariantIndex].stock - newQuantity;
          console.log("newStock=" + productVariants[selectedVariantIndex].stock);
          if (newStock < 0) {
            alert("庫存不足");
            return prevDetails;
          }
          updatedDetails = [
            ...prevDetails,
            {
              color: selectedColor,
              size: selectedSize,
              quantity: currentAddToCartQuantity,
              stock: newStock,
            },
          ];
        }

        localStorage.setItem("chosenProductDetails", JSON.stringify(updatedDetails));
        setUpperStockLimit(chosenProductDetails.stock);
        updateCartTotal();
        return updatedDetails;
      });
      alert("已加入商品");
    }

    // setUpperStockLimit((prevLimit) => prevLimit - chosenProductDetails.quantity);
    setcurrentAddToCartQuantity(0);
  };

  return (
    <>
      <ProductColor
        colors={props.colors}
        setSelectedColor={setSelectedColor}
        chosenProductDetails={chosenProductDetails}
        setcurrentAddToCartQuantity={setcurrentAddToCartQuantity}
      />
      <ProductSize
        sizes={props.sizes}
        inStockSizes={inStockSizes}
        setSelectedSize={setSelectedSize}
        selectedColor={selectedColor}
        setcurrentAddToCartQuantity={setcurrentAddToCartQuantity}
        chosenProductDetails={chosenProductDetails}
      />
      <ProductQuantity currentAddToCartQuantity={currentAddToCartQuantity} changeQuantity={handleChangeQuantity} />
      <AddToCartButton handleAddToCart={handleAddToCart} cartPropmt={cartPropmt} />
    </>
  );
};

const ProductColor = (props) => {
  // const colors = ["rgba(255, 255, 255, 1)", "rgba(221, 255, 187, 1)", "rgba(204, 204, 204, 1)"];
  const colors = props.colors || [];

  const [selectedStatus, setSelectedStatus] = useState(null); // 用來判斷是否被選取，外層的selectedColor此時還沒有被設定，除非onClick後再渲染一次，不然抓不到

  //加入購物車後清除選取狀態
  useEffect(() => {
    props.setSelectedColor(null);
    setSelectedStatus(null);
  }, [props.chosenProductDetails]);

  const handleColorClick = (color) => {
    props.setSelectedColor(color);
    setSelectedStatus(color);
  };

  return (
    <FlexContainer>
      <ChoiceTextContainer>顏色 |</ChoiceTextContainer>
      {colors.map((color, index) => (
        <SquareStyle
          key={index}
          color={color.code}
          active={selectedStatus === color.code ? "true" : undefined}
          onClick={() => {
            handleColorClick(color.code);
          }}
        ></SquareStyle>
      ))}
    </FlexContainer>
  );
};

const ProductSize = (props) => {
  // const sizes = ["S", "M", "L"];
  const sizes = props.sizes || [];
  let inStockSizes = props.inStockSizes || [];
  console.log("inStockSizes=" + inStockSizes);

  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    setSelectedStatus(null);
    props.setSelectedSize(null);
    inStockSizes = [];
  }, [props.chosenProductDetails]);

  const handleSizeClick = (size) => {
    if (props.selectedColor) {
      props.setSelectedSize(size);
      setSelectedStatus(size);
      props.setcurrentAddToCartQuantity(0);
    }
  };

  return (
    <FlexContainer>
      <ChoiceTextContainer>尺寸 |</ChoiceTextContainer>

      {sizes.map((size, index) => (
        <RoundStyle
          key={index}
          active={selectedStatus === size ? "true" : undefined}
          instock={inStockSizes.includes(size) ? "true" : undefined}
          onClick={() => {
            handleSizeClick(size);
          }}
        >
          {size}
        </RoundStyle>
      ))}
    </FlexContainer>
  );
};

const ProductQuantity = (props) => {
  const currentAddToCartQuantity = props.currentAddToCartQuantity;
  return (
    <ThemeProvider theme={theme}>
      <FlexContainer>
        <ChoiceQuantityTextContainer>數量 |</ChoiceQuantityTextContainer>
        <QuantityContainer>
          <CounterActionButton onClick={() => props.changeQuantity(-1)}>-</CounterActionButton>
          <QuantitySpan>{currentAddToCartQuantity}</QuantitySpan>
          <CounterActionButton onClick={() => props.changeQuantity(1)}>+</CounterActionButton>
        </QuantityContainer>
      </FlexContainer>
    </ThemeProvider>
  );
};

const SquareStyle = styled.div`
  height: 24px;
  width: 24px;
  margin-right: 32px;
  border: 1px solid rgba(211, 211, 211, 1);
  background-color: #${(props) => props.color};

  outline: ${(props) => (props.active === "true" ? "1px solid " + props.theme.stroke : "0")};
  outline-offset: ${(props) => (props.active === "true" ? "6px" : "0")};

  &:hover {
    outline: 1px solid ${(props) => props.theme.stroke};
    outline-offset: 6px;
    transition: outline-offset 0.1s;
  }
`;

const ChoiceTextContainer = styled.div`
  letter-spacing: 4px;
  line-height: 24px;
  font-size: 20px;
  margin-right: 24px;
  width: 100px;

  @media (max-width: 1279px) {
    font-size: 14px;
    line-height: 17px;
    width: 62px;
    margin: 0;
  }
`;

const ChoiceQuantityTextContainer = styled(ChoiceTextContainer)`
  @media (max-width: 1279px) {
    display: none;
  }
`;

const RoundStyle = styled.div`
  height: 36px;
  width: 36px;
  margin-right: 20px;
  background-color: ${(props) => (props.instock === "true" ? props.theme.sizeDefault : props.theme.sizeNone)};
  /* background-color: ${(props) => (props.instock ? "#cccccc" : "#BB7744")}; */
  border-radius: 18px;
  text-align: center;
  line-height: 36px;
  color: ${(props) => (props.instock === "true" ? (props.active === "true" ? "#fff" : "#000") : props.theme.stroke)};
  background-color: ${(props) =>
    props.instock === "true"
      ? props.active === "true"
        ? props.theme.sizeHover
        : props.theme.sizeDefault
      : props.theme.sizeNone};
  cursor: ${(props) => (props.instock === "true" ? "pointer" : "not-allowed")};

  &:hover {
    background-color: ${(props) => (props.instock === "true" ? props.theme.sizeHover : props.theme.sizeNone)};
    color: ${(props) => (props.instock === "true" ? "#fff" : props.theme.stroke)};
    transition: ease-in-out 0.1s;
  }
`;

// const RoundStyle = styled.div`
//   height: 36px;
//   width: 36px;
//   margin-right: 20px;
//   background-color: ${(props) => props.instock ? props.theme.sizeDefault : props.theme.sizeNone};
//   border-radius: 18px;
//   text-align: center;
//   line-height: 36px;

//   &:hover {
//     background-color: ${(props) => props.theme.sizeHover};
//     color: #fff;
//     transition: ease-in-out 0.1s;
//   }
// `;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
  border: 1px solid rgba(151, 151, 151, 1);
  justify-content: space-between;
  padding: 0 15px;
`;

const QuantitySpan = styled.span`
  color: ${(props) => props.theme.defaultBrown};
`;

const CounterActionButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
`;

// export default ProductChoices;
export default ProductOptions;
