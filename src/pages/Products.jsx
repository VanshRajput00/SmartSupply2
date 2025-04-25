import Card from "../components/Card";

const dummyProducts = [
  { id: 1, name: "Organic Wheat Flour", price: 450, image: "/assets/wheat.jpg" },
  { id: 2, name: "Natural Honey", price: 299, image: "/assets/honey.jpg" },
  { id: 3, name: "Rice Pack", price: 799, image: "/assets/rice.jpg" },
  { id: 4, name: "Cooking Oil", price: 599, image: "/assets/oil.jpg" },
  { id: 5, name: "Spices Combo", price: 999, image: "/assets/spices.jpg" },
];

export default function Products() {
  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {dummyProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
