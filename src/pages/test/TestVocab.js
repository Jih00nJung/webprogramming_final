import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import WordOpic1 from "../../word/WordOpic1";
import MediaControlCard from "../../components/MediaControllCard";
import "../../styles/global.css";

const TestVocab = () => {
    const navigate = useNavigate();
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (id, value) => {
        setUserAnswers(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const isCorrectAnswer = (userInput, correctAnswers) => {
        return correctAnswers.some(
            ans => ans.trim() === userInput?.trim()
        );
    };

    const correctCount = WordOpic1.filter(word =>
        isCorrectAnswer(userAnswers[word.id], word.answer)
    ).length;

    return (
        <div style={{maxWidth: 600, margin: "40px auto", fontFamily: "Noto Sans KR, sans-serif"}}>
            <h2 style={{textAlign: "center", fontWeight: "bold", marginBottom: 20}}>단어 학습</h2>

            {WordOpic1.map(opic => {
                const isCorrect = submitted && isCorrectAnswer(userAnswers[opic.id], opic.answer);
                const isIncorrect = submitted && userAnswers[opic.id] && !isCorrect;

                return (
                    <div key={opic.id}
                         style={{
                             backgroundColor: "white",
                             borderRadius: 12,
                             padding: 30,
                             boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                             marginBottom: 40,
                             textAlign: "center",
                         }}
                    >
                        <p style={{marginBottom: 20, fontSize: 16}}>다음 단어의 뜻을 입력하세요.</p>
                        <strong style={{fontSize: 24, display: "block", marginBottom: 20}}>{opic.word}</strong>
                        <MediaControlCard audioSrc={opic.audio}/>
                        <input
                            type="text"
                            placeholder="뜻을 입력하세요"
                            value={userAnswers[opic.id] || ""}
                            onChange={(e) => handleChange(opic.id, e.target.value)}
                            style={{
                                width: "80%",
                                padding: "12px 10px",
                                fontSize: 16,
                                borderRadius: 8,
                                border: "1.5px solid #ddd",
                                outline: "none",
                                boxSizing: "border-box",
                                marginBottom: 10
                            }}
                            disabled={submitted}
                        />
                        {submitted && (
                            <p style={{color: isCorrect ? "green" : "red", marginTop: 10}}>
                                {isCorrect
                                    ? "정답입니다!"
                                    : `오답입니다. 정답: ${opic.answer.join(", ")}`}
                            </p>
                        )}
                    </div>
                );
            })}

            <div style={{textAlign: "center"}}>
                {!submitted ? (
                    <button
                        className="submit-button"
                        onClick={handleSubmit}
                        disabled={Object.keys(userAnswers).length !== WordOpic1.length}
                    >
                        정답 제출
                    </button>
                ) : (
                    <div className="result-box">
                        <p className="result-title">정답 확인 완료!</p>
                        {correctCount} / {WordOpic1.length} 정답
                    </div>
                )}

                <br/>
                <button className="back-button" onClick={() => navigate("/testlist")}>
                    문제목록으로 돌아가기
                </button>
            </div>
        </div>
    );
};

export default TestVocab;
