import { useCallback } from "react";
import {
  createProduct,
  initializeNewProduct,
  removeCurrentProduct,
  removeProduct,
  selectProduct,
  updateProduct,
  useProductsList,
} from "../utils/products";
import { ProductForm } from "./ProductForm";
import { ProductList } from "./ProductList";
import "./Products.css";
import { Product } from "./product.model";

export function Products() {
  const {
    state: { products },
    dispatch,
    selectedProduct,
  } = useProductsList();

  const productSelected = useCallback(
    (productId: number) => {
      selectProduct(productId, dispatch);
    },
    [dispatch]
  );

  const newProduct = useCallback(() => {
    initializeNewProduct(dispatch);
  }, [dispatch]);

  const addProduct = useCallback(
    (createdProduct: Product) => {
      createProduct(createdProduct, dispatch);
    },
    [dispatch]
  );

  const editProduct = useCallback(
    (updatedProduct: Product) => {
      updateProduct(updatedProduct, dispatch);
    },
    [dispatch]
  );

  const deleteProduct = useCallback(
    (id: number) => {
      removeProduct(id, dispatch);
    },
    [dispatch]
  );

  const clearCurrent = useCallback(() => {
    removeCurrentProduct(dispatch);
  }, [dispatch]);

  return (
    <div className="container main-content">
      <div className="row">
        <div className="col-md-4">
          <ProductList
            products={products}
            errorMessage=""
            selectedProduct={selectedProduct}
            productWasSelected={productSelected}
            initializeNewProduct={newProduct}
          />
        </div>
        <div className="col-md-8">
          <ProductForm
            selectedProduct={selectedProduct}
            errorMessage=""
            create={addProduct}
            update={editProduct}
            deleteFn={deleteProduct}
            clearCurrent={clearCurrent}
          />
        </div>
      </div>
    </div>
  );
}

export default Products;
