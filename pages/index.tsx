import CategoryBanner from "../components/CategoryBanner";

export default function Home() {
  const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];

  return (
    <div>
      {categories.map((el: any) => (
        <CategoryBanner
          key={Math.random() * 2000}
          category={el}
        />
      ))}
    </div>
  );
}
