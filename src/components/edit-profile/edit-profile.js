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

  // Автосохранение в localStorage при изменении полей
  useEffect(() => {
    const subscription = watch((value) => {
      if (value.username) localStorage.setItem("userName", value.username);
      if (value.email) localStorage.setItem("userEmail", value.email);
      if (value.image) localStorage.setItem("userImage", value.image);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  // Инициализация формы
  useEffect(() => {
    if (!user) return;

    const savedData = {
      username: localStorage.getItem("userName") || user.username || "",
      email: localStorage.getItem("userEmail") || user.email || "",
      image: localStorage.getItem("userImage") || user.image || "",
    };

    reset({
      ...savedData,
      password: "", // Пароль никогда не сохраняем
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

        // Уведомляем другие компоненты
        window.dispatchEvent(
          new CustomEvent("userProfileUpdated", {
            detail: result.payload,
          })
        );

        navigate("/profile");
      }
    } catch (err) {
      // Обработка ошибок
      const errorObj = err?.response?.data?.errors || err;

      // Очищаем невалидные данные
      if (errorObj.username) {
        localStorage.removeItem("userName");
        setError("username", { message: errorObj.username });
      }
      if (errorObj.email) {
        localStorage.removeItem("userEmail");
        setError("email", { message: errorObj.email });
      }
      if (errorObj.password) {
        setError("password", { message: errorObj.password });
      }
      if (errorObj.image) {
        localStorage.removeItem("userImage");
        setError("image", { message: errorObj.image });
      }
    }
  };

  if (!user) {
    return <div className="auth-message">Please log in to edit your profile</div>;
  }

  return (
    <form className="create-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-title">Edit Profile</h2>

      <div className="input-container">
        {/* Поле имени пользователя */}
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

        {/* Поле email */}
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

        {/* Поле нового пароля */}
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
          <span className="hint">Leave empty to keep current password</span>
        </div>

        {/* Поле аватара */}
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

// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { updateUser } from "../../store/actions";
// import "./edit-profile.css";

// const EditProfile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth || {});
//   const { loading, error } = useSelector((state) => state.profile || {});

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isDirty },
//     setError,
//     reset,
//   } = useForm({
//     mode: "onBlur",
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//       image: "",
//     },
//   });

//   useEffect(() => {
//     if (!user) return;

//     reset({
//       username: localStorage.getItem("userName"),
//       email: localStorage.getItem("userEmail"),
//       password: "",
//       image: localStorage.getItem("userImage"),
//     });
//   }, [user, reset]);

//   const onSubmit = async (formData) => {
//     try {
//       const userData = formData.password ? { ...formData } : (({ password, ...rest }) => rest)(formData);

//       // Используем await без unwrap()
//       const resultAction = await dispatch(updateUser(userData));

//       // Проверяем успешность действия
//       if (resultAction.payload) {
//         const updatedUser = resultAction.payload;

//         // Сохраняем данные и уведомляем другие компоненты
//         localStorage.setItem("userName", updatedUser.username);
//         localStorage.setItem("userEmail", updatedUser.email);
//         localStorage.setItem("userImage", updatedUser.image || "");

//         // Отправляем кастомное событие
//         window.dispatchEvent(new Event("userDataUpdated"));

//         navigate("/profile");
//       }
//     } catch (err) {
//       // Обработка ошибок
//       const errorObj = err?.response?.data?.errors || err;
//       if (errorObj.username) setError("username", { message: errorObj.username });
//       if (errorObj.email) setError("email", { message: errorObj.email });
//       if (errorObj.password) setError("password", { message: errorObj.password });
//       if (errorObj.image) setError("image", { message: errorObj.image });
//     }
//   };

//   return (
//     <form className="create-form" onSubmit={handleSubmit(onSubmit)}>
//       <h2 className="form-title">Edit Profile</h2>

//       <div className="input-container">
//         {/* Поле имени пользователя */}
//         <div className="input-group">
//           <label className="label" htmlFor="username">
//             Username
//           </label>
//           <input
//             className={`input ${errors.username ? "input-error" : ""}`}
//             type="text"
//             id="username"
//             placeholder="Username"
//             {...register("username", {
//               required: "Required field",
//               minLength: {
//                 value: 3,
//                 message: "The name must be between 3 and 20 characters long",
//               },
//               maxLength: {
//                 value: 20,
//                 message: "The name must be between 3 and 20 characters long",
//               },
//             })}
//           />
//           {errors.username && <span className="error-message">{errors.username.message}</span>}
//         </div>

//         {/* Поле email */}
//         <div className="input-group">
//           <label className="label" htmlFor="email">
//             Email address
//           </label>
//           <input
//             className={`input ${errors.email ? "input-error" : ""}`}
//             type="email"
//             id="email"
//             placeholder="Email address"
//             {...register("email", {
//               required: "Required field",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "Incorrect email address",
//               },
//             })}
//           />
//           {errors.email && <span className="error-message">{errors.email.message}</span>}
//         </div>

//         {/* Поле нового пароля */}
//         <div className="input-group">
//           <label className="label" htmlFor="password">
//             New password
//           </label>
//           <input
//             className={`input ${errors.password ? "input-error" : ""}`}
//             type="password"
//             id="password"
//             placeholder="New password"
//             {...register("password", {
//               minLength: {
//                 value: 6,
//                 message: "Your password must be between 6 and 40 characters long.",
//               },
//               maxLength: {
//                 value: 40,
//                 message: "Your password must be between 6 and 40 characters long.",
//               },
//             })}
//           />
//           {errors.password && <span className="error-message">{errors.password.message}</span>}
//           {/* <span className="hint">Leave empty to keep current password</span> */}
//         </div>

//         {/* Поле аватара */}
//         <div className="input-group">
//           <label className="label" htmlFor="image">
//             Avatar image (URL)
//           </label>
//           <input
//             className={`input ${errors.image ? "input-error" : ""}`}
//             type="url"
//             id="image"
//             placeholder="Avatar image URL"
//             {...register("image", {
//               pattern: {
//                 value: /^https?:\/\/.+/,
//                 message: "Please enter a valid URL",
//               },
//             })}
//           />
//           {errors.image && <span className="error-message">{errors.image.message}</span>}
//         </div>
//       </div>

//       <div className="action-block">
//         <button className="create-button" type="submit" disabled={loading || !isDirty}>
//           {loading ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EditProfile;

// const EditProfile = () => {
//   return (
//     <form className="create-form">
//       <h2 className="form-title">Edit Profile</h2>
//       <div className="input-container">
//         <Input id="username" label="Username" placeholder="Username" />
//         <Input id="email-address" label="Email address" placeholder="Email address" type="email" />
//         <Input id="new-password" label="New password" placeholder="New password" type="password" />
//         <Input
//           id="avatar-image"
//           label="Avatar image (url)"
//           placeholder="Avatar image"
//           type="url"
//           pattern="https://.*"
//           required
//         />
//       </div>

//       <div className="action-block">
//         <button className="create-button">Save</button>
//       </div>
//     </form>
//   );
// };

// export default EditProfile;
