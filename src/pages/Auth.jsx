import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [mode, setMode] = useState("signup");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signUp, login, user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function getMode() {
    return {
      signup: "Sign Up",
      login: "Login",
    };
  }

  function submit(data) {
    setError(null);
    let response;

    if (mode === "signup") {
      response = signUp(data.email, data.password);
    } else {
      response = login(data.email, data.password);
    }

    if (response.success) {
      navigate("/");
    } else {
      setError(response.error);
    }
  }

  return (
    <main>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div className="shadow p-4 rounded">
          <h3 className="p-2 mb-4 text-center fw-bold">{getMode()[mode]}</h3>

          <form onSubmit={handleSubmit(submit)}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Eamil
              </label>
              <input
                {...register("email", { required: "Email is required!" })}
                type="email"
                id="email"
                className="form-control"
                placeholder="Email..."
              />
              {errors.email && (
                <p className="text-danger mt-2 fs-6">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 4,
                    message: "Too short!",
                  },
                  maxLength: {
                    value: 8,
                    message: "Too long!",
                  },
                })}
                type="password"
                id="password"
                className="form-control"
                placeholder="******"
              />
              {errors.password && (
                <p className="text-danger mt-2 fs-6">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              {getMode()[mode]}
            </button>
          </form>

          <IsSignUp mode={mode} setMode={setMode} />
        </div>
      </div>
    </main>
  );
}

function IsSignUp({ mode, setMode }) {
  return (
    <div className="pt-3">
      <p className="mb-0">
        {mode === "signup"
          ? "Already have an account?"
          : "Don't have an account?"}
        <span
          onClick={() => setMode(mode === "signup" ? "login" : "signup")}
          className="text-primary px-2 text-decoration-underline"
        >
          {mode === "signup" ? "Login" : "SignUp"}
        </span>
      </p>
    </div>
  );
}
