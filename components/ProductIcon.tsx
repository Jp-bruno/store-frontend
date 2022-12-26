import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const StyledProduct = styled.div`
  min-width: 250px;
  max-width: 300px;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
  padding: 24px;
  border-radius: 8px;
  background-color: #222;

  .image-div {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    min-height: 60%;

    &:hover .image-div-buttons-div {
      opacity: 1;
    }

    .image-div-buttons-div {
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 10px;

      & button {
        width: 60%;
        cursor: pointer;
      }
    }
  }

  .product-data-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 40%;

    .product-title {
      margin: 0;
      text-align: center;

      a:hover {
        text-decoration: underline;
      }
    }

    .product-price {
      padding-bottom: 10px;
    }
  }
`;

type ProductIconProps = {
  productImage: string;
  productName: string;
  productPrice: number;
};

export default function ProductIcon({
  productImage,
  productName,
  productPrice,
}: ProductIconProps) {
  return (
    <StyledProduct>
      <div className="image-div">
        <Image
          src={productImage}
          fill
          alt={productName}
        />
        <div className="image-div-buttons-div">
          <button>Add to cart</button>

          <button>Buy now</button>
        </div>
      </div>
      <div className="product-data-div">
        <h3 className="product-title" title={productName}>
          <Link href={"#"}>{productName.length > 80 ? productName.slice(0, 80) + '...' : productName}</Link>
        </h3>
        <Link
          className="product-price"
          href={"#"}
        >
          R$ {productPrice.toFixed(2).toString().replace(".", ",")}
        </Link>
      </div>
    </StyledProduct>
  );
}
