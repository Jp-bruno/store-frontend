import styled from "styled-components";
import { Oval } from "react-loader-spinner";

const StyledLoading = styled.div`
  display: grid;
  place-items: center;
`;

export default function Loading() {
  return (
    <StyledLoading>
      <Oval
        color="white"
        secondaryColor="#555555"
      />
    </StyledLoading>
  );
}
