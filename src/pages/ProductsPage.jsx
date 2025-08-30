


import { useEffect, useState } from "react";
import ProductTable from "../components/products/ProductTable";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { HiMenu } from "react-icons/hi";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const limit = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = (product) => setProducts([...products, { ...product, id: Date.now() }]);
  const updateProduct = (updated) => setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
  const deleteProduct = (id) => setProducts(products.filter((p) => p.id !== id));

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || p.category === category)
  );

  const totalPages = Math.ceil(filteredProducts.length / limit);
  const startIndex = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`bg-white p-6 shadow-md w-64 fixed md:static top-0 left-0 h-full z-50 transform transition-transform duration-300
        ${filterOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex justify-between items-center md:hidden mb-4">
          <h2 className="font-bold text-lg text-gray-800">Filters</h2>
          <button onClick={() => setFilterOpen(false)}>✕</button>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Search</label>
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-gray-300 focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-gray-400">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-0 md:ml-64 p-6 flex flex-col min-h-screen">
        <button className="md:hidden mb-4 p-2 bg-gray-800 text-white rounded-md" onClick={() => setFilterOpen(true)}>
          <HiMenu className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome to SnapShop..</h2>

        <div className="flex-1 flex flex-col gap-4">
          <ProductTable
            products={paginatedProducts}
            loading={loading}
            addProduct={addProduct}
            updateProduct={updateProduct}
            deleteProduct={deleteProduct}
          />

          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={i + 1 === page ? "default" : "outline"}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

