import { createContext, useContext } from "react";

type ProductContextProps = [
  showDisplayCode: boolean,
  setShowDisplayCode: (value: boolean) => void
];

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

ProductContext.displayName = "ProductContext";

function useProduct() {
  const value = useContext(ProductContext);
  if (!value) {
    throw new Error("useProduct must be used within ProductProvider");
  }

  return value;
}

export { useProduct, ProductContext };
