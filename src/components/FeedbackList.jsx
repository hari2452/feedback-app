function FeedbackList({ feedbacks }) {
  if (feedbacks.length === 0) {
    return (
      <div className="empty-feedback">
        <p>No feedback submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="feedback-list">
      <h2>Submitted Feedback</h2>

      <div className="feedback-grid">
        {feedbacks.map((feedback) => (
          <div
            className="feedback-card"
            key={feedback.id}
          >
            <div className="feedback-card-header">
              <h3>{feedback.name}</h3>

              <span className="rating">
                ⭐ {feedback.rating}/5
              </span>
            </div>

            <p>{feedback.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbackList;