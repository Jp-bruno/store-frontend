import styled from "styled-components";

const StyledWrapper = styled.div`

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

type InputProps = {
    quantity: number
    setQuantity: (prevState:any) => void
}

export default function CartQuantityInput({quantity, setQuantity}:InputProps) {

  function setInputValue(operation: 'plus' | 'minus') {
    if ((quantity === 1 && operation === 'minus') || (quantity === 10 && operation === 'plus')) {
      return
    }
    setQuantity(operation === 'minus' ? quantity - 1 : quantity + 1)
  }

  return (
    <StyledWrapper>
      <button onClick={() => setInputValue('minus')}>-</button>
      <input
        min={1}
        max={50}
        maxLength={2}
        readOnly
        type="number"
        value={quantity}
      ></input>
      <button onClick={() => setInputValue('plus')}>+</button>
    </StyledWrapper>
  );
}
