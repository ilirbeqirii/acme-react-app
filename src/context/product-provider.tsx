import { useState } from "react";
import { ProductContext } from "./product-context";

function ProductProvider({ children }: { children: React.ReactNode }) {
  const [showDisplayCode, setShowDisplayCode] = useState(false);

  return (
    <ProductContext.Provider value={[showDisplayCode, setShowDisplayCode]}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductProvider };
