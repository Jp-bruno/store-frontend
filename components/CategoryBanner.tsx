import Link from "next/link";
import styled from "styled-components";

const StyledBanner = styled.div``;

export default function CategoryBanner({ category }: { category: string }) {
  return <StyledBanner><h1><Link href={'/' + category}>{category}</Link></h1></StyledBanner>;
}
