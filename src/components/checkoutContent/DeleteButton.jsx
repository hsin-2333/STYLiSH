import styled from "styled-components";
import { useState } from "react";

import cartRemove from "../../assets/cart-remove.png";
import cartRemoveHover from "../../assets/cart-remove-hover.png";


const DeleteButton = () => {
    const [hover, setHover] = useState(false);

  return (
    <DeleteButtonDiv 
        $imageSrc={hover ? cartRemoveHover: cartRemove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
    />
  );
}

const DeleteButtonDiv = styled.div`
  background-color: transparent;
  height: 44px;
  width: 44px;
  margin-left: 52px;
  /* border: none; */
  background-image: url(${props => props.$imageSrc});

`;

export default DeleteButton;