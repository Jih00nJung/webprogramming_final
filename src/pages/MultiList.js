import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../styles/global.css";

function MultiList() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const rooms = [
        {name: "토익 공부 같이해요", users: "3 / 4"},
        {name: "단어 초보자만", users: "1 / 4"},
        {name: "OPIc 대비반", users: "2 / 4"}
    ];

    const filteredRooms = rooms.filter((room) =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="testlist-wrapper">
            <header className="header">
                <h1>함께 학습</h1>
                <button
                    className="back-button"
                    onClick={() => navigate("/")}
                    style={{backgroundColor: "transparent", fontWeight: "bold"}}
                >
                    홈으로 돌아가기
                </button>
            </header>

            <div className="action-bar">
                <Link to="/multiroom">
                    <button className="create-button">방 만들기</button>
                </Link>
                <input
                    type="text"
                    className="search-input"
                    placeholder="방 제목으로 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="problem-list">
                {filteredRooms.map((room, index) => (
                    <div className="multi-item" key={index}>
                        <Link to={`/multivocab`} className="multi-item-link">
                            <span className="room-title">{room.name}</span>
                            <span className="multi-item-users">{room.users}</span>
                        </Link>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default MultiList;
