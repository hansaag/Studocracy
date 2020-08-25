import React from "react";

export const ParticipantSession = () => {
  const newQuestions = Array();
  const topQuestions = Array();

  return (
    <div className="Participant-session-container">
      <div className="chronological-question-list">
        <h2>Nye spørsmål</h2>
        <ul></ul>
      </div>
      <div className="top-question-list">
        <h2>Topprangerte spørsmål</h2>
        <ul></ul>
      </div>
    </div>
  );
};
