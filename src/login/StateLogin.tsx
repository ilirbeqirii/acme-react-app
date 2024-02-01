import { useNavigate } from "react-router-dom";
import "./Login.css";
import React, { FormEvent } from "react";
import { useAuth } from "../auth/use-auth";

function Login() {
  const navigate = useNavigate();
  const [maskUserName, setMaskUserName] = React.useState(false);
  const [, , , login] = useAuth();

  const [fields, setFields] = React.useState({
    username: "",
    password: "",
  });

  const [fieldsEdited, setFieldsEdited] = React.useState({
    username: false,
    password: false,
  });

  function handleInputChange(
    identifier: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setFields((value) => ({ ...value, [identifier]: event?.target.value }));
  }

  function handleOnFocusAway(identifier: string) {
    setFieldsEdited((prevState) => ({
      ...prevState,
      [identifier]: true,
    }));
  }

  const toggleMask = () => {
    setMaskUserName(!maskUserName);
  };

  const cancel = () => {
    navigate("/welcome");
  };

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const username = (event.target as HTMLFormElement).elements.namedItem(
      "username"
    ) as HTMLInputElement;
    const password = (event.target as HTMLFormElement).elements.namedItem(
      "password"
    ) as HTMLInputElement;

    const isValidUsername = username.value.length;
    const isValidPassword = password.value.length;

    if (!isValidUsername) {
      setFieldsEdited((prevValue) => ({ ...prevValue, username: true }));
      return;
    }

    if (!isValidPassword) {
      setFieldsEdited((prevValue) => ({ ...prevValue, password: true }));
      return;
    }

    console.log({ username: username.value, password: password.value });

    login(username.value, password.value);
    navigate("/products");
  }

  return (
    <div className="container main-content">
      <div className="card">
        <div className="card-header">Log In</div>

        <div className="card-body">
          <form onSubmit={handleLogin}>
            <fieldset>
              <div className="form-group">
                <label htmlFor="username" className="col-form-label">
                  User Name
                </label>

                <div style={{ maxWidth: "700px", flex: "1" }}>
                  <input
                    type={maskUserName ? "password" : "text"}
                    id="username"
                    name="username"
                    className={`form-control ${
                      fieldsEdited.username && !fields.username.length
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="User Name (required)"
                    value={fields.username}
                    onChange={(event) => handleInputChange("username", event)}
                    onBlur={() => handleOnFocusAway("username")}
                  />

                  {fieldsEdited.username && !fields.username.length ? (
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
                    name="password"
                    className={`form-control ${
                      fieldsEdited.password && !fields.password.length
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Password (required)"
                    value={fields.password}
                    onChange={(event) => handleInputChange("password", event)}
                    onBlur={() => handleOnFocusAway("password")}
                  />

                  {fieldsEdited.password && !fields.password.length ? (
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
                  disabled={false}
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
