import React from "react";
import {Link, useNavigate} from "react-router-dom";
import "../styles/global.css";

function TestList() {
    const navigate = useNavigate();
    return (
        <div className="testlist-wrapper">
            <header className="header">
                <h1>개인 학습</h1>
                <button className="back-button"
                        onClick={() => navigate("/")}
                        style={{
                            backgroundColor: "transparent",
                            fontWeight: "bold"
                        }}>
                    홈으로 돌아가기
                </button>
            </header>


            <div className="stats-section">
                <div className="stat-card">
                    <h3>학습량</h3>
                    <div className="totalPercent">50%</div>
                </div>
                <div className="stat-card">
                    <h3>오늘의 목표</h3>
                    <p>모든 문제 풀기 도전!</p>
                </div>
                <div className="stat-card">
                    <h3>학습 팁</h3>
                    <p>퀴즈를 여러 번 반복하면 <br/>기억에 더 잘 남아요!</p>
                </div>
            </div>

            <div className="problem-list">
                <Link to={`/testvocab`}>
                    <div className="problem-item-solved">OPIc 빈출 단어 1</div>
                </Link>
                <Link to={`/testmcq`}>
                    <div className="problem-item">토익 빈출 객관식 1</div>
                </Link>
            </div>
        </div>
    );
}

export default TestList;
