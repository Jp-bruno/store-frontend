import styled from "styled-components";
import { useQuery } from "react-query";
import CategoryBanner from "../components/CategoryBanner";
import { Oval } from "react-loader-spinner";

const StyledMain = styled("main")`
  padding: 100px;
`;

export default function Home() {
  async function getCategories() {
    let data = await fetch("https://fakestoreapi.com/products/categories").then((res) =>
      res.json()
    );

    return data;
  }
  const { data, isLoading } = useQuery("Categories", getCategories, {
    refetchOnWindowFocus: false,
  });
  return (
    <StyledMain>
      {isLoading ? (
        <div style={{display: 'grid', placeItems: 'center'}}>
          <Oval
            color="white"
            secondaryColor="#555555"
          />
        </div>
      ) : (
        data.map((el: any) => (
          <CategoryBanner
            key={Math.random() * 2000}
            category={el}
          />
        ))
      )}
    </StyledMain>
  );
}
