import { useState, useEffect } from "react";

import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import ToastContainer from "./components/ToastContainer";

import { useToast } from "./hooks/useToast";

function App() {
  const [feedbacks, setFeedbacks] = useState(() => {
    try {
      const savedFeedbacks = localStorage.getItem("feedbacks");

      return savedFeedbacks
        ? JSON.parse(savedFeedbacks)
        : [];
    } catch (error) {
      console.log("LocalStorage read error:", error);
      return [];
    }
  });

  const { toasts, showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(
        "feedbacks",
        JSON.stringify(feedbacks)
      );
    } catch (error) {
      console.log("LocalStorage save error:", error);
    }
  }, [feedbacks]);

  function addFeedback(feedback) {
    setFeedbacks((prev) => [
      ...prev,
      feedback,
    ]);
  }

  return (
    <div className="app">
      <ToastContainer toasts={toasts} />

      <header className="header">
        <h1>Feedback App</h1>
        <p>Share your experience with us</p>
      </header>

      <main className="main-container">
        <section className="form-section">
          <h2>Send Feedback</h2>

          <FeedbackForm
            onAddFeedback={addFeedback}
            showToast={showToast}
          />
        </section>

        <FeedbackList feedbacks={feedbacks} />
      </main>
    </div>
  );
}

export default App;