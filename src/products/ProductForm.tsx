import { useEffect, useRef } from "react";
import { Product } from "./product.model";
import "./ProductForm.css";
import { FieldValues, useForm } from "react-hook-form";

type ProductFormProps = {
  selectedProduct: Product | undefined;
  errorMessage: string;
  create: (product: Product) => void;
  update: (product: Product) => void;
  deleteFn: (id: number) => void;
  clearCurrent: () => void;
};

const validationMessages = {
  productName: {
    required: "Product name is required.",
    minlength: "Product name must be at least three characters.",
    maxlength: "Product name cannot exceed 50 characters.",
  },
  productCode: {
    required: "Product code is required.",
  },
  starRating: {
    range: "Rate the product between 1 (lowest) and 5 (highest).",
  },
};

function ProductForm({
  selectedProduct,
  errorMessage,
  create,
  update,
  deleteFn,
  clearCurrent,
}: ProductFormProps) {
  const pageTitle = useRef("Product Edit");
  const {
    register,
    handleSubmit,
    getFieldState,
    reset,
    formState: { isValid, isDirty, errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      productName: selectedProduct?.productName,
      productCode: selectedProduct?.productCode,
      starRating: selectedProduct?.starRating,
      description: selectedProduct?.description,
    },
  });

  const productNameState = getFieldState("productName");
  const productCodeState = getFieldState("productCode");
  const starRatingState = getFieldState("starRating");

  useEffect(() => {
    if (selectedProduct) {
      // Display the appropriate page title
      if (selectedProduct.id === 0) {
        pageTitle.current = "Add Product";
      } else {
        pageTitle.current = `Edit Product: ${selectedProduct.productName}`;
      }

      // Update the data on the form
      reset({
        productName: selectedProduct.productName,
        productCode: selectedProduct.productCode,
        starRating: selectedProduct.starRating,
        description: selectedProduct.description,
      });
    }
  }, [selectedProduct, reset]);

  const saveProduct = (product: FieldValues) => {
    if (isValid && isDirty) {
      const modifiedProduct: Product = {
        ...selectedProduct,
        ...product,
      } as Product;

      if (modifiedProduct.id == 0) {
        create(modifiedProduct);
      } else {
        update(modifiedProduct);
      }
    }
  };
  const cancelEdit = () => {
    reset();
  };

  const deleteProduct = (product: Product) => {
    if (product && product.id) {
      if (confirm(`Really delete the product: ${product.productName}?`)) {
        deleteFn(product.id);
      }
    } else {
      // No need to delete, it was never saved
      clearCurrent();
    }
  };

  return (
    selectedProduct && (
      <>
        <div className="card">
          <div className="card-header">{pageTitle.current}</div>
          <div className="card-body">
            <form onSubmit={handleSubmit(saveProduct)}>
              <fieldset>
                <div className="form-group row no-gap">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="productNameId"
                  >
                    Product Name
                  </label>

                  <div className="col-md-9">
                    <input
                      className={`form-control ${
                        (productNameState.isDirty ||
                          productNameState.isTouched) &&
                        productNameState.error
                          ? "is-invalid"
                          : null
                      }`}
                      id="productNameId"
                      {...register("productName", {
                        required: true,
                        minLength: 3,
                        maxLength: 50,
                      })}
                      type="text"
                      placeholder="Name (required)"
                    />
                    {productNameState.error && productNameState.error.type && (
                      <span className="invalid-feedback">
                        {productNameState.error.type == "required" &&
                          validationMessages.productName.required}
                        {productNameState.error.type == "minLength" &&
                          validationMessages.productName.minlength}
                        {productNameState.error.type == "maxLength" &&
                          validationMessages.productName.maxlength}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group row no-gap">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="productCodeId"
                  >
                    Product Code
                  </label>

                  <div className="col-md-9">
                    <input
                      className={`form-control ${
                        (productCodeState.isDirty ||
                          productCodeState.isTouched) &&
                        productCodeState.error
                          ? "is-invalid"
                          : null
                      }`}
                      id="productCodeId"
                      {...register("productCode", { required: true })}
                      type="text"
                      placeholder="Code (required)"
                    />

                    {productCodeState.error && productCodeState.error.type && (
                      <span className="invalid-feedback">
                        {
                          validationMessages["productCode"][
                            productCodeState.error.type as "required"
                          ]
                        }
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group row no-gap">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="starRatingId"
                  >
                    Star Rating (1-5)
                  </label>

                  <div className="col-md-9">
                    <input
                      className={`form-control ${
                        (starRatingState.isDirty ||
                          starRatingState.isTouched) &&
                        starRatingState.error
                          ? "is-invalid"
                          : null
                      }`}
                      id="starRatingId"
                      {...register("starRating", {
                        validate: {
                          range: (value) => {
                            if (
                              value &&
                              (isNaN(value) || value < 1 || value > 5)
                            ) {
                              return false;
                            }
                            return true;
                          },
                        },
                      })}
                      type="text"
                      placeholder="Rating (required)"
                    />

                    {starRatingState.error && starRatingState.error.type && (
                      <span className="invalid-feedback">
                        {
                          validationMessages["starRating"][
                            starRatingState.error.type as "range"
                          ]
                        }
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group row no-gap">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="descriptionId"
                  >
                    Description
                  </label>

                  <div className="col-md-9">
                    <textarea
                      className="form-control"
                      {...register("description")}
                      id="descriptionId"
                      rows={3}
                      placeholder="Description"
                    ></textarea>
                  </div>
                </div>

                <div className="form-group no-gap">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    style={{ width: "80px", marginRight: "10px" }}
                    disabled={!isValid || !isDirty}
                  >
                    Save
                  </button>

                  <button
                    className="btn btn-secondary"
                    type="button"
                    style={{ width: "100px", marginRight: "10px" }}
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-secondary"
                    type="button"
                    style={{ width: "80px" }}
                    onClick={() => deleteProduct(selectedProduct)}
                  >
                    Delete
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        {errorMessage && (
          <div className="alert alert-danger">Error: {errorMessage}</div>
        )}
      </>
    )
  );
}

export { ProductForm };
