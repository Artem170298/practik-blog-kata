import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from "react-hook-form";
import { Checkbox } from "antd";
import { registerUser } from "../../store/actions";
import "./sign-up.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, registerSuccess } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    setValue,
    trigger,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      agreed: false,
    },
  });

  const onSubmit = (data) => {
    if (data.agreed) {
      dispatch(registerUser(data.username, data.email, data.password));
    }
  };

  useEffect(() => {
    if (registerSuccess) {
      navigate("/sign-in");
    }
  }, [registerSuccess, navigate]);

  useEffect(() => {
    if (error) {
      if (error.username) {
        setError("username", { type: "server", message: error.username });
      }
      if (error.email) {
        setError("email", { type: "server", message: error.email });
      }
      if (error.password) {
        setError("password", { type: "server", message: error.password });
      }
    }
  }, [error, setError]);

  const password = watch("password");

  return (
    <form className="create-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-title">Create new account</h2>

      <div className="input-container">
        <div className="input-group">
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            className={`input ${errors.username ? "input-error" : ""}`}
            type="text"
            id="username"
            placeholder="Username"
            {...register("username", {
              required: "Required field",
              minLength: {
                value: 3,
                message: "The name must be between 3 and 20 characters long",
              },
              maxLength: {
                value: 20,
                message: "The name must be between 3 and 20 characters long",
              },
            })}
          />
          {errors.username && <span className="error-message">{errors.username.message}</span>}
        </div>

        <div className="input-group">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className={`input ${errors.email ? "input-error" : ""}`}
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", {
              required: "Required field",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Incorrect email address",
              },
            })}
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>

        <div className="input-group">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className={`input ${errors.password ? "input-error" : ""}`}
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", {
              required: "Required field",
              minLength: {
                value: 6,
                message: "Your password must be between 6 and 40 characters long.",
              },
              maxLength: {
                value: 40,
                message: "Your password must be between 6 and 40 characters long.",
              },
            })}
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>

        <div className="input-group">
          <label className="label" htmlFor="repeatPassword">
            Repeat Password
          </label>
          <input
            className={`input ${errors.repeatPassword ? "input-error" : ""}`}
            type="password"
            id="repeatPassword"
            placeholder="Password"
            {...register("repeatPassword", {
              required: "Repeat Password",
              validate: (value) => value === password || "Passwords must match",
            })}
          />
          {errors.repeatPassword && <span className="error-message">{errors.repeatPassword.message}</span>}
        </div>
      </div>

      <div className={`checkbox-container ${errors.agreed ? "has-error" : ""}`}>
        <Checkbox
          name="agreed"
          checked={watch("agreed")}
          onChange={(e) => {
            setValue("agreed", e.target.checked);
            trigger("agreed");
          }}
          aria-invalid={!!errors.agreed}
          aria-describedby={errors.agreed ? "agreed-error" : undefined}
        >
          <span className="checkbox-label">
            I agree to the processing of my personal information
            <span className="required-asterisk"> *</span>
          </span>
        </Checkbox>

        {errors.agreed && (
          <div id="agreed-error" className="error-message">
            {errors.agreed.message}
          </div>
        )}
      </div>

      <div className="action-block">
        <button className="create-button" type="submit" disabled={loading}>
          {loading ? "Creation..." : "Create"}
        </button>

        <span className="security-question">
          Already have an account?{" "}
          <Link to="/sign-in" className="sign">
            Sign In.
          </Link>
        </span>
      </div>
    </form>
  );
};

export default SignUp;
