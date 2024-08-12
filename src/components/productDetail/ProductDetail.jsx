import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import ProductDescription from "./ProductDescription";
import ProductMore from "./ProductMore";

const ProductContent = () => {
  const productDetailUrl = "https://api.appworks-school.tw/api/1.0/products/details?id=";
  const [product, setProduct] = useState([]);
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");

  useEffect(() => {
    if (productId) {
      fetch(productDetailUrl + productId)
        .then((response) => {
          return response.json();
        })
        .then((productData) => {
          setProduct(productData.data);
        })
        .catch((error) => console.log("Error:", error));
    }
  }, [productId]);
  // const [products, setProducts] = useState([
  //   {
  //     "data": {
  //       "id": 1234,
  //       "category": "men",
  //       "title": "厚實毛呢格子外套",
  //       "description": "高抗寒素材選用，保暖也時尚有型",
  //       "price": 2200,
  //       "texture": "棉、聚脂纖維",
  //       "wash": "手洗（水溫40度",
  //       "place": "韓國",
  //       "note": "實品顏色以單品照為主",
  //       "story": "你絕對不能錯過的超值商品",
  //     },
  //     "colors": [
  //       {
  //         "code": "334455",
  //         "name": "深藍",
  //       },
  //     ],
  //     "sizes": ["S", "M", "L"],
  //     "main_image":"https://stylish.com/main.jpg",

  //   },
  // ]);

  //日後將ProductDescription props合併
  return (
    <ThemeProvider theme={theme}>
      <ContentContainer>
        <ProductDescription
          img={product.main_image}
          title={product.title}
          id={product.id}
          description={product.description}
          price={product.price}
          category={product.category}
          texture={product.texture}
          wash={product.wash}
          place={product.place}
          note={product.note}
          colors={product.colors}
          sizes={product.sizes}
          variants={product.variants}
        />
        <ProductMore story={product.story} moreImages={product.images} />
      </ContentContainer>
    </ThemeProvider>
  );
};

const ContentContainer = styled.div`
  flex: 1;
  width: 960px;
  margin: 0 auto;
  margin-bottom: 110px; //headerIcon height:60px + margin:50px

  @media (max-width: 1279px) {
    width: 100%;
  }
`;

export default ProductContent;
