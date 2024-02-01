import { useReducer } from "react";
import { Product } from "../products/product.model";

export const initProduct: Product = {
  id: 0,
  productName: "",
  productCode: "New",
  description: "",
  starRating: 0,
};

export const products: Product[] = [
  {
    id: 1,
    productName: "Leaf Rake",
    productCode: "GDN-0011",
    description: "Leaf rake with 48-inch wooden handle",
    starRating: 3.2,
  },
  {
    id: 2,
    productName: "Garden Cart",
    productCode: "GDN-0023",
    description: "15 gallon capacity rolling garden cart",
    starRating: 4.2,
  },
  {
    id: 3,
    productName: "Hammer",
    productCode: "TBX-0048",
    description: "Curved claw steel hammer",
    starRating: 4.8,
  },
  {
    id: 4,
    productName: "Saw",
    productCode: "TBX-0022",
    description: "15-inch steel blade hand saw",
    starRating: 3.7,
  },
  {
    id: 5,
    productName: "Video Game Controller",
    productCode: "GMG-0042",
    description: "Standard two-button video game controller",
    starRating: 4.6,
  },
];

type CreateUpdateActionData = {
  type: "CREATE" | "UPDATE";
  product: Product;
};

type DeleteActionData = {
  type: "DELETE";
  productId: number;
};

type SelectActionData = {
  type: "SELECT";
  productId: number;
};

type TypeOnlyActionData = {
  type: "REMOVE_CURRENT" | "INITIALIZE_NEW";
};

type Action =
  | CreateUpdateActionData
  | DeleteActionData
  | SelectActionData
  | TypeOnlyActionData;

type ProductsState = {
  products: Product[];
  selectedProductId: number | undefined;
};

function productsReducer(state: ProductsState, action: Action): ProductsState {
  switch (action.type) {
    case "CREATE": {
      action.product.id = state.products[state.products.length - 1].id + 1;

      return {
        ...state,
        products: [...state.products, action.product],
        selectedProductId: action.product.id,
      };
    }
    case "UPDATE": {
      const updatedProducts = state.products.map((currentProduct: Product) =>
        currentProduct.id === action.product.id
          ? action.product
          : currentProduct
      );

      return {
        ...state,
        products: [...updatedProducts],
        selectedProductId: action.product.id,
      };
    }
    case "DELETE": {
      const allProducts = state.products.filter(
        (product) => product.id !== action.productId
      );

      return {
        ...state,
        products: [...allProducts],
        selectedProductId: undefined,
      };
    }
    case "REMOVE_CURRENT": {
      return { ...state, selectedProductId: undefined };
    }
    case "INITIALIZE_NEW": {
      return { ...state, selectedProductId: initProduct.id };
    }
    case "SELECT": {
      return { ...state, selectedProductId: action.productId };
    }
    default: {
      throw new Error(`Unhandled action type: ${action["type"]}`);
    }
  }
}

const defaultState: ProductsState = {
  products: products,
  selectedProductId: 0,
};

function useProductsList() {
  const [state, dispatch] = useReducer(productsReducer, defaultState);

  const selectedProduct =
    state.selectedProductId == 0
      ? initProduct
      : state.products.find((product) => product.id == state.selectedProductId);

  return { state, dispatch, selectedProduct };
}

function createProduct(product: Product, dispatch: (value: Action) => void) {
  if (!product) {
    return;
  }

  dispatch({ type: "CREATE", product });
}

function updateProduct(product: Product, dispatch: (value: Action) => void) {
  dispatch({ type: "UPDATE", product });
}

function removeProduct(productId: number, dispatch: (value: Action) => void) {
  dispatch({ type: "DELETE", productId });
}

function removeCurrentProduct(dispatch: (value: Action) => void) {
  dispatch({ type: "REMOVE_CURRENT" });
}

function initializeNewProduct(dispatch: (value: Action) => void) {
  dispatch({ type: "INITIALIZE_NEW" });
}

function selectProduct(productId: number, dispatch: (value: Action) => void) {
  dispatch({ type: "SELECT", productId });
}

export {
  useProductsList,
  createProduct,
  updateProduct,
  removeProduct,
  removeCurrentProduct,
  initializeNewProduct,
  selectProduct,
};
