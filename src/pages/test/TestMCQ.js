import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import MediaControlCard from "../../components/MediaControllCard";
import WordToeic1 from "../../word/WordToeic1";
import "../../styles/global.css";

const TestMCQ = () => {
    const navigate = useNavigate();
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);


    const handleSelect = (qid, choice) => {
        if (!submitted) {
            setUserAnswers(prev => ({
                ...prev,
                [qid]: choice
            }));
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    return (
        <div className="container">
            <h2>객관식 학습 퀴즈</h2>

            {WordToeic1.map(toeic => (
                <div key={toeic.id} className="question-block">
                    <div className="question">
                        {toeic.problem === "wrong" ? (
                            <p>다음 단어의 뜻으로 <u>옳지</u> 않은 것은?</p>
                        ) : (
                            <p>다음 단어의 뜻으로 옳은 것은?</p>
                        )}
                        <div className="word-audio-wrapper">
                            <strong className="quiz-word">{toeic.word}</strong>
                            <MediaControlCard audioSrc={toeic.audio}/>
                        </div>
                    </div>


                    <div className="choices">
                        {toeic.choices.map(choice => {
                            const isCorrect = submitted && choice === toeic.answer;
                            const isSelected = userAnswers[toeic.id] === choice;

                            return (
                                <button
                                    key={choice}
                                    className={`choice-button ${
                                        submitted
                                            ? isCorrect
                                                ? "correct"
                                                : isSelected
                                                    ? "incorrect"
                                                    : ""
                                            : isSelected
                                                ? "selected"
                                                : ""
                                    }`}
                                    onClick={() => handleSelect(toeic.id, choice)}
                                >
                                    {choice}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}

            {!submitted ? (
                <button className="submit-button" onClick={handleSubmit}>
                    정답 제출
                </button>
            ) : (
                <div className="result-box">
                    <p className="result-title">정답 확인 완료!</p>
                    {Object.values(userAnswers).filter((ans, idx) => ans === WordToeic1[idx].answer).length} / {WordToeic1.length} 정답
                </div>
            )}

            <br/>
            <button className="back-button" onClick={() => navigate("/testlist")}>
                문제목록으로 돌아가기
            </button>
        </div>
    );
};

export default TestMCQ;
