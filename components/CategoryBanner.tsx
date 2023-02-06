import Link from "next/link";

export default function CategoryBanner({ category }: { category: string }) {
  return <h1><Link href={'/products/categories/' + category}>{category}</Link></h1>;
}
