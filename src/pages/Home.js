import React from 'react';
import '../styles/global.css';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className="home-wrapper">
            <div className="home-header">
                <h1 className="home-title">Quiz 학습 플랫폼</h1>
                <p className="home-description">효율적인 학습을 위한 맞춤형 퀴즈 연습</p>
            </div>

            <div className="progress-section">
                <p className="subtitle">현재 진행 상황</p>
                <Link to={`/testvocab`}>
                    <span className="progress">OPIc 출제 문제 - 50%</span>
                </Link>
            </div>

            <div className="button-container-horizontal">
                <Link to={"/testlist"} className="button-link">
                    <div className="button big-button">개인 학습하기</div>
                </Link>
                <Link to={"/multilist"} className="button-link">
                    <div className="button big-button">
                        <div>다른 사람들과 퀴즈 풀기</div>
                        <div style={{fontSize: "13px", marginTop: "2px"}}>최대 4인까지 플레이 가능</div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Home;
