/* eslint-disable no-console */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../store/actions";
import "./edit-profile.css";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth || {});
  const { loading, error } = useSelector((state) => state.profile || {});

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
    reset,
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      image: "",
    },
  });

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.username) localStorage.setItem("userName", value.username);
      if (value.email) localStorage.setItem("userEmail", value.email);
      if (value.image) localStorage.setItem("userImage", value.image);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (!user) return;

    const savedData = {
      username: localStorage.getItem("userName") || user.username || "",
      email: localStorage.getItem("userEmail") || user.email || "",
      image: localStorage.getItem("userImage") || user.image || "",
    };

    reset({
      ...savedData,
      password: "",
    });
  }, [user, reset]);

  const onSubmit = async (formData) => {
    try {
      const userData = formData.password ? { ...formData } : (({ password, ...rest }) => rest)(formData);

      const result = await dispatch(updateUser(userData));

      if (result.payload) {
        // Обновляем localStorage
        localStorage.setItem("userName", result.payload.username);
        localStorage.setItem("userEmail", result.payload.email);
        localStorage.setItem("userImage", result.payload.image || "");

        window.dispatchEvent(
          new CustomEvent("userProfileUpdated", {
            detail: {
              username: result.payload.username,
              email: result.payload.email,
              image: result.payload.image,
            },
          })
        );

        navigate("/");
      }
    } catch (err) {
      console.error("Update failed:", err);

      if (user) {
        localStorage.setItem("userName", user.username);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userImage", user.image || "");
      }

      const errorObj = err?.response?.data?.errors || {};
      Object.keys(errorObj).forEach((key) => {
        setError(key, { message: errorObj[key] });
      });
    }
  };

  return (
    <form className="create-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-title">Edit Profile</h2>

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
            Email address
          </label>
          <input
            className={`input ${errors.email ? "input-error" : ""}`}
            type="email"
            id="email"
            placeholder="Email address"
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
            New password
          </label>
          <input
            className={`input ${errors.password ? "input-error" : ""}`}
            type="password"
            id="password"
            placeholder="New password"
            {...register("password", {
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
          <label className="label" htmlFor="image">
            Avatar image (URL)
          </label>
          <input
            className={`input ${errors.image ? "input-error" : ""}`}
            type="url"
            id="image"
            placeholder="Avatar image URL"
            {...register("image", {
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Please enter a valid URL",
              },
            })}
          />
          {errors.image && <span className="error-message">{errors.image.message}</span>}
        </div>
      </div>

      <div className="action-block">
        <button className="create-button" type="submit" disabled={loading || !isDirty}>
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
