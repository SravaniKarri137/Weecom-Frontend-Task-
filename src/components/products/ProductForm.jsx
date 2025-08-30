// import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProductForm = ({ onSubmit, editingProduct, onCancel }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title || "");
      setPrice(editingProduct.price || "");
      setStock(editingProduct.stock || "");
      setCategory(editingProduct.category || "");
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      id: editingProduct?.id,
      title,
      price: Number(price),
      stock: Number(stock),
      category,
    });

    // Reset fields after submission
    setTitle("");
    setPrice("");
    setStock("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div>
        <Label>Price</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Stock</Label>
        <Input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Category</Label>
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">{editingProduct ? "Update" : "Add"} Product</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
