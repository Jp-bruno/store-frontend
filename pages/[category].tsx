import styled from "styled-components";
import ProductIcon from "../components/ProductIcon";

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
  row-gap: 35px;
`;

function EmptySpace() {
  return (
    <div
      style={{
        minWidth: "250px",
        maxWidth: "300px",
        width: "20%",
      }}
    ></div>
  );
}

export default function Products({ data }: { data: any }) {
  const dataArray = data.map((el: any) => el);

  while (dataArray.length % 4 !== 0) {
    dataArray.push(null);
  }

  return (
    <StyledDiv>
      {dataArray.map((el: any) => {
        return el === null ? (
          <EmptySpace key={Math.random() * 2000} />
        ) : (
          <ProductIcon
            productImage={el.image}
            productName={el.title}
            productPrice={el.price}
            productID={el.id}
            key={Math.random() * 2000}
          />
        );
      })}
    </StyledDiv>
  );
}

export async function getStaticPaths() {
  const response = await fetch("https://fakestoreapi.com/products/categories").then(
    (res) => res.json()
  );

  const paths = response.map((element: string) => ({
    params: { category: element },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { category: string } }) {
  let data = await fetch(
    `https://fakestoreapi.com/products/category/${params.category}`
  ).then((res) => res.json());

  return {
    props: {
      data,
    },
  };
}
