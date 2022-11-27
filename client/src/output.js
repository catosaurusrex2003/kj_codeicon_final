import React from "react";

export default function Output({ flip, output, setShowArr }) {
  // props wala kaam karna hai

  return (
    <div className="rect_master">
      <h1>Based on your selections...</h1>
      <div className="rect rect1">
        <h3 className="one_small_text">calories</h3>
        <h1 className="big_text">{output.calories}</h1>
        <p className="two_small_text">kcal</p>
        <p className="speech_text">
          Many customers are very concious about their calorie count in food. A
          high calorie count is not prefered.
        </p>
      </div>
      <div className="rect rect2">
        <h3 className="one_small_text">Grade</h3>
        <h1 className="big_text">{output.grade}/5</h1>
        <p className="two_small_text"></p>
        <p className="speech_text">
          This grade represents the score of customer liking the recipe
        </p>
      </div>
      <div className="rect rect3">
        <h3 className="one_small_text">Number of Ingredients</h3>
        <h1 className="big_text">{output.numArr}</h1>
        {/* <p className="two_small_text">kcal</p> */}
        <p className="speech_text">
          High Number of ingredients are usually a hassle of a user. Simple and
          less Number of ingredients are apprieciated.
        </p>
      </div>
      <button className="re_evaluate" onClick={() => { setShowArr([]); flip() }}>
        Re Evaluate
      </button>
    </div>
  );
}
