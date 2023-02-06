import styled from "styled-components";
import Image from "next/image";
import { useQuery } from "react-query";
import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import QuantityInput from "../../../components/QuantityInput";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;

  .image-parent {
    position: relative;
    height: 50vh;
    width: 20vw;
    object-fit: contain;
  }

  .price {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }

  .buttons {
    display: flex;
    column-gap: 20px;

    button {
      width: 100%;
      padding: 10px;
    }
  }
`;

export default function ProductPage({ data }: any) {
  const { addProductToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  if (data) {
    return (
      <StyledDiv>
        <div className="image-parent">
          <Image
            src={data.image}
            alt={data.title}
            fill
          ></Image>
        </div>
        <div>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <div className='price'>
            <h2>$ {data.price}</h2>x<QuantityInput quantity={quantity} setQuantity={setQuantity}/>
          </div>
  
          <div className="buttons">
            <button onClick={() => addProductToCart({id: data.id, price: data.price, title: data.title, quantity})}>Add to cart</button>
            <button>Buy now</button>
          </div>
        </div>
      </StyledDiv>
    );
  }

  return null
  
}

export async function getStaticPaths() {
  const data = await fetch(`https://fakestoreapi.com/products`).then((res) => res.json());

  const paths = data.map((element: any) => ({
    params: { productID: element.id.toString() },
  }));

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const data = await fetch(`https://fakestoreapi.com/products/${params.productID}`).then((res) => res.json());
  return {
    props: {data: data},
  };
}
