import { Product } from "./product.model";
import "./ProductList.css";
import { useProduct } from "../context/product-context";

type ProductListProps = {
  errorMessage: string;
  products: Product[];
  selectedProduct: Product | undefined;
  productWasSelected: (id: number) => void;
  initializeNewProduct: () => void;
};

function ProductList({
  errorMessage,
  products = [],
  selectedProduct,
  productWasSelected,
  initializeNewProduct,
}: ProductListProps) {
  const [displayCode, setDisplayCode] = useProduct();

  const displayCodeChange = () => {
    setDisplayCode(!displayCode);
  };

  const pageTitle = "Products";

  return (
    <>
      <div className="card">
        <div className="card-header">{pageTitle}</div>

        {products.length > 0 ? (
          <div className="card-body" style={{ padding: "0" }}>
            <div className="list-group">
              {products.map((product) => {
                return (
                  <button
                    key={product.id}
                    type="button"
                    className={`list-group-item list-group-item-action rounded-0 ${
                      product?.id == selectedProduct?.id ? "active" : null
                    }`}
                    onClick={() => productWasSelected(product.id)}
                  >
                    {product.productName}&nbsp;
                    {displayCode && `(${product.productCode})`}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="card-footer">
          <div className="row">
            <div className="form-check">
              <label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={displayCodeChange}
                  checked={displayCode}
                />
                Display Product Code
              </label>
            </div>

            <div className="text-right">
              <button
                className="btn btn-primary"
                onClick={initializeNewProduct}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {errorMessage ?? (
        <div className="alert alert-danger">Error: {errorMessage}</div>
      )}
    </>
  );
}

export { ProductList };
