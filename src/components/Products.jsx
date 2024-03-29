import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts, updateProduct } from "../api/productsApi";

export const Products = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id),
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log("Product deleted successfully!!");
      queryClient.invalidateQueries("products");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      console.log("Product updated successfully!!");
      queryClient.invalidateQueries("products");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <button
            onClick={() => {
              deleteProductMutation.mutate(product.id);
            }}
          >
            Delete
          </button>
          <input
            checked={product.inStock}
            type="checkbox"
            onChange={(e) => {
              updateProductMutation.mutate({
                ...product,
                inStock: e.target.checked,
              });
            }}
          />
          <label>In stock</label>
        </div>
      ))}
    </>
  );
};
