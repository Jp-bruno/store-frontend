import styled from "styled-components";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const StyledWrapper = styled.div`
  margin-inline: 10px;
  input {
    text-align: center;
    min-width: 40%;
    max-width: 50%;
    border-radius: 0;
    border: 0;
    -moz-appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  button {
    border-radius: 0;
    border: 0;
  }
`;

export default function CartQuantityInput({
  quantity,
  id,
}: {
  quantity: number;
  id: number;
}) {
  const { setQuantity } = useContext(CartContext);

  function setInputValue(operation: 'plus' | 'minus') {
    if ((quantity === 1 && operation === 'minus') || (quantity === 10 && operation === 'plus')) {
      return
    }

    setQuantity(id, operation === 'plus' ? quantity + 1 : quantity - 1)
  }

  return (
    <StyledWrapper>
      <button onClick={() => setInputValue('minus')}>-</button>
      <input
        className={`quantity-input ${id}`}
        id={String(id)}
        min={1}
        max={50}
        maxLength={2}
        readOnly
        type="number"
        defaultValue={quantity}
        onChange={(event) => setQuantity(id, Number(event.target.value))}
      ></input>
      <button onClick={() => setInputValue('plus')}>+</button>
    </StyledWrapper>
  );
}
