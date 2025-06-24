import React, {useEffect, useState} from "react";
import WordOpic1 from "../../word/WordOpic1";
import "../../styles/global.css";
import {useNavigate} from "react-router-dom";


const MultiVocab = () => {
    const navigate = useNavigate();

    const [players] = useState(["웹프", "로그", "래밍"]);
    const [scores, setScores] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [inputValues, setInputValues] = useState({});
    const [submittedAnswers, setSubmittedAnswers] = useState({});
    const [firstCorrect, setFirstCorrect] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const currentQ = WordOpic1[currentQuestionIndex];

    useEffect(() => {
        const initialScores = {};
        players.forEach(p => initialScores[p] = 0);
        setScores(initialScores);
        setCurrentQuestionIndex(0);
    }, [players]);

    useEffect(() => {
        setInputValues({});
        setSubmittedAnswers({});
        setFirstCorrect(null);
    }, [currentQuestionIndex]);

    const handleInputChange = (player, value) => {
        setInputValues(prev => ({...prev, [player]: value}));
    };

    const handleSubmit = (player) => {
        if (submittedAnswers[player]) return;

        const input = inputValues[player]?.trim();
        const isCorrect = currentQ.answer.some(ans => ans.trim() === input);

        setSubmittedAnswers(prev => ({...prev, [player]: input}));

        if (isCorrect && !firstCorrect) {
            setFirstCorrect(player);
            setScores(prev => ({...prev, [player]: prev[player] + 1}));
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex + 1 < WordOpic1.length) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setGameOver(true);
        }
    };

    const getWinners = () => {
        const max = Math.max(...Object.values(scores));
        return players.filter(p => scores[p] === max);
    };

    return (
        <div className="multi-container">
            <div className="header">
                <h2 className="title">실시간 단어 퀴즈</h2>
                <button className="back-button"
                        onClick={() => navigate("/multilist")}
                        style={{
                            backgroundColor: "transparent",
                            fontWeight: "bold"
                        }}>
                    목록으로 돌아가기
                </button>
            </div>

            {gameOver ? (
                <div style={{textAlign: "center"}}>
                    <h3>게임 종료</h3>
                    {players.map(p => (
                        <p key={p}><strong>{p}</strong>: {scores[p]}점</p>
                    ))}
                    <p style={{fontSize: 18, marginTop: 20}}>우승자: {getWinners().join(", ")}</p>
                </div>
            ) : (
                <>
                    <div className="question-multi">
                        <p>문제 {currentQuestionIndex + 1} / {WordOpic1.length}</p>
                        <h2 style={{fontSize: 28}}>{currentQ.word}</h2>
                        <p style={{color: "#888", marginTop: 10}}>뜻을 먼저 맞힌 사람이 점수를 얻습니다</p>
                    </div>

                    {players.map(player => (
                        <div key={player}
                             className="player-div">
                            <strong style={{width: 60}}>{player}</strong>
                            <input
                                type="text"
                                value={inputValues[player] || ""}
                                onChange={(e) => handleInputChange(player, e.target.value)}
                                disabled={!!submittedAnswers[player]}
                                style={{
                                    flex: 1,
                                    padding: 10,
                                    border: "1.5px solid #ccc",
                                    borderRadius: 6,
                                    fontSize: 16
                                }}
                            />
                            {submittedAnswers[player] ? (
                                <div/>
                            ) : (
                                <button
                                    onClick={() => handleSubmit(player)}
                                    disabled={!!submittedAnswers[player]}
                                    className="button-multi-submit">
                                    제출
                                </button>
                            )}
                            {submittedAnswers[player] && (
                                currentQ.answer.includes(submittedAnswers[player]) ? (
                                    <span style={{color: "green", fontWeight: "bold"}}>정답</span>
                                ) : (
                                    <span style={{color: "red", fontWeight: "bold"}}>오답</span>
                                )
                            )}
                        </div>
                    ))}

                    <div style={{textAlign: "center", marginTop: 30}}>
                        <button
                            className="submit-button"
                            onClick={nextQuestion}
                            disabled={Object.keys(submittedAnswers).length < players.length}
                        >
                            다음 문제
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MultiVocab;
