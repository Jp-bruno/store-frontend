import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";

const StyledMain = styled.main`
  border: solid 1px #555;
  display: flex;
  flex-direction: column;
  align-items: center;

  .finish-purchase {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-inline: auto;
    padding: 10px;
  }

  table {
    width: 100%;

    tbody {
      display: flex;
      flex-direction: column;
      row-gap: 10px;

      tr {
        border-top: solid 1px #555;
        border-bottom: solid 1px #555;
        display: grid;
        grid-template-columns: 5% 55% 35% 5%;
        align-items: center;

        &.total-row {
          display: flex;

          & td {
            width: 100%;
            text-align: center;
          }
        }

        td {
          &.centered-content {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px 0;
          }
        }
      }
    }
  }
`;

export default function Cart() {
  const { products, removeProductFromCart } = useContext(CartContext);

  const totalPrice =
    products === null
      ? false
      : Number(products?.map((el) => el.price).reduce((prev, curr) => prev + curr))
          .toFixed(2)
          .replace(".", ",");

  console.log(products);
  return (
    <StyledMain>
      <table>
        <thead>
          <tr>
            <th>
              <h1>Cart</h1>
            </th>
          </tr>
        </thead>

        <tbody>
          {products?.map(({ id, title, price }, index) => {
            return (
              <tr key={Math.random() * 2000}>
                <td className="centered-content">{index + 1}</td>

                <td>{title}</td>

                <td className="centered-content">
                  {Number(price).toFixed(2).replace(".", ",")}
                </td>

                <td className="centered-content">
                  <button onClick={() => removeProductFromCart(id)}>x</button>
                </td>
              </tr>
            );
          })}

          <tr className="total-row">
            <td>
              {totalPrice === false ? (
                <h3>Your cart is empty.</h3>
              ) : (
                <h3>Total: {totalPrice}</h3>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <button className="finish-purchase" disabled={totalPrice === false ? true : false}>Finish purchase</button>
    </StyledMain>
  );
}
