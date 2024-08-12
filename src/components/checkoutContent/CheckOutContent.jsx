import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";

import ShoppingCart from "./ShoppingCart";
import PaymentInfo from "./PaymentInfo";
import CheckoutCalculater from "./CheckoutCalculater";

const CheckoutContent = () => {
  return (
    <ThemeProvider theme={theme}>
      <ShoppingCart/>
      <PaymentInfo/>
      <CheckoutCalculater />
    </ThemeProvider>
  );
};


export default CheckoutContent;
