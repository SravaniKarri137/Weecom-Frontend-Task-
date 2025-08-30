
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductForm from "./ProductForm";

const ProductRow = ({ product, onUpdate, onDelete }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <tr className="border-b hover:bg-gray-50 transition">
        <td className="px-4 py-2">{product.title}</td>
        <td className="px-4 py-2">{product.brand}</td>
        <td className="px-4 py-2">{product.category}</td>
        <td className="px-4 py-2">${product.price}</td>
        <td className="px-4 py-2">{product.stock}</td>
        <td className="px-4 py-2 flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setDialogOpen(true)}>
            Edit
          </Button>
          <Button size="sm" variant="destructive" onClick={() => onDelete(product.id)}>
            Delete
          </Button>
        </td>
      </tr>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm
            editingProduct={product}
            onSubmit={(updated) => {
              onUpdate({ ...product, ...updated });
              setDialogOpen(false);
            }}
            onCancel={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductRow;
