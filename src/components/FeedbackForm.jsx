import { useForm } from "../hooks/useForm";

function FeedbackForm({ onAddFeedback, showToast }) {
  const {
    values,
    errors,
    handleChange,
    validateForm,
    resetForm,
  } = useForm(
    {
      name: "",
      email: "",
      rating: "",
      message: "",
    },
    (vals) => {
      const errs = {};

      if (!vals.name.trim()) {
        errs.name = "Name is required";
      }

      if (!vals.email.trim()) {
        errs.email = "Email is required";
      } else if (!vals.email.includes("@")) {
        errs.email = "Valid email is required";
      }

      if (!vals.rating) {
        errs.rating = "Rating is required";
      }

      if (!vals.message.trim()) {
        errs.message = "Message is required";
      }

      return errs;
    }
  );

  function handleSubmit(e) {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      showToast("Please fix the errors below", "error");
      return;
    }

    const feedback = {
      id: Date.now(),
      name: values.name,
      email: values.email,
      rating: values.rating,
      message: values.message,
    };

    onAddFeedback(feedback);

    showToast("Feedback submitted!", "success");

    resetForm();
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={values.name}
          onChange={handleChange}
        />

        {errors.name && (
          <p className="error-message">{errors.name}</p>
        )}
      </div>

      <div className="form-group">
        <label>Email</label>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
        />

        {errors.email && (
          <p className="error-message">{errors.email}</p>
        )}
      </div>

      <div className="form-group">
        <label>Rating</label>

        <select
          name="rating"
          value={values.rating}
          onChange={handleChange}
        >
          <option value="">Select rating</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>

        {errors.rating && (
          <p className="error-message">{errors.rating}</p>
        )}
      </div>

      <div className="form-group">
        <label>Message</label>

        <textarea
        name="message"
        placeholder="Write your feedback"
        value={values.message}
        onChange={handleChange}
        rows="5"
        maxLength="300"
    />

<p className="character-count">
  {values.message.length}/300 characters
</p>

        {errors.message && (
          <p className="error-message">{errors.message}</p>
        )}
      </div>

      <button type="submit">
        Submit Feedback
      </button>
    </form>
  );
}

export default FeedbackForm;