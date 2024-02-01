import { useNavigate } from "react-router-dom";
import "./Login.css";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useAuth } from "../auth/use-auth";

function Login() {
  const navigate = useNavigate();
  const [maskUserName, setMaskUserName] = React.useState(false);
  const [, , , login] = useAuth();

  // forms managing
  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { isValid, errors },
  } = useForm({
    mode: "all",
  });

  const userNameState = getFieldState("username");
  const passwordState = getFieldState("password");

  const toggleMask = () => {
    setMaskUserName(!maskUserName);
  };

  const cancel = () => {
    navigate("/welcome");
  };

  async function handleLogin(data: FieldValues) {
    if (isValid) {
      await login(data.username, data.password);
      navigate("/products");
    }
  }

  return (
    <div className="container main-content">
      <div className="card">
        <div className="card-header">Log In</div>

        <div className="card-body">
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset>
              <div className="form-group">
                <label htmlFor="username" className="col-form-label">
                  User Name
                </label>

                <div style={{ maxWidth: "700px", flex: "1" }}>
                  <input
                    type={maskUserName ? "password" : "text"}
                    id="username"
                    {...register("username", { required: true })}
                    className={`form-control ${
                      (userNameState.isTouched || userNameState.isDirty) &&
                      userNameState.invalid
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="User Name (required)"
                  />

                  {(userNameState.isTouched || userNameState.isDirty) &&
                  userNameState.error?.type == "required" ? (
                    <div className="invalid-feedback">
                      User name is required.
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="col-form-label">
                  Password
                </label>

                <div style={{ maxWidth: "700px", flex: "1" }}>
                  <input
                    type="password"
                    id="password"
                    {...register("password", { required: true })}
                    className={`form-control ${
                      (passwordState.isTouched || passwordState.isDirty) &&
                      passwordState.invalid
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Password (required)"
                  />

                  {(passwordState.isTouched || passwordState.isDirty) &&
                  passwordState.error?.type == "required" ? (
                    <div className="invalid-feedback">
                      Password is required.
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ width: "80px", marginRight: "10px" }}
                  disabled={!isValid}
                >
                  Log In
                </button>

                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => cancel()}
                >
                  Cancel
                </button>
              </div>
            </fieldset>
          </form>
        </div>

        <div className="card-footer">
          <div className="row">
            <div className="form-check">
              <label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={() => toggleMask()}
                  checked={maskUserName}
                />
                Mask user name
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
