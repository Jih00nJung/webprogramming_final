import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../../styles/global.css";

function MultiRoom() {
    const navigate = useNavigate();
    const [roomName, setRoomName] = useState("");
    const [maxUsers, setMaxUsers] = useState(4);
    const [isPublic, setIsPublic] = useState(true);
    const [invitee, setInvitee] = useState("");
    const [inviteList, setInviteList] = useState([]);

    const handleAddInvitee = () => {
        if (invitee && !inviteList.includes(invitee)) {
            setInviteList([...inviteList, invitee]);
            setInvitee("");
        }
    };

    const handleRemoveInvitee = (user) => {
        setInviteList(inviteList.filter((u) => u !== user));
    };

    const handleCreateRoom = () => {
        if (!roomName) return alert("방 이름을 입력해주세요.");
        const roomData = {
            roomName,
            maxUsers,
            isPublic,
            inviteList,
        };
        console.log("생성된 방:", roomData);
        navigate("/multilist");
    };

    return (
        <div className="testlist-wrapper">
            <header className="header">
                <h1>방 만들기</h1>
                <button
                    className="back-button"
                    onClick={() => navigate(-1)}
                    style={{backgroundColor: "transparent", fontWeight: "bold"}}
                >
                    뒤로가기
                </button>
            </header>

            <div className="form-section">
                <label>방 이름</label>
                <input
                    className="input-box"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="예: 단어 공부방"
                />

                <label>최대 인원 수</label>
                <select
                    className="input-box"
                    value={maxUsers}
                    onChange={(e) => setMaxUsers(Number(e.target.value))}
                >
                    {[...Array(3)].map((_, i) => (
                        <option key={i} value={i + 2}>
                            {i + 2}명
                        </option>
                    ))}
                </select>

                <label>참여 방법</label>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            value="public"
                            checked={isPublic}
                            onChange={() => setIsPublic(true)}
                        />
                        공개
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="private"
                            checked={!isPublic}
                            onChange={() => setIsPublic(false)}
                        />
                        비공개
                    </label>
                </div>

                <label>사용자 초대</label>
                <div className="invite-box">
                    <input
                        className="input-box"
                        value={invitee}
                        onChange={(e) => setInvitee(e.target.value)}
                        placeholder="사용자명 또는 이메일"
                    />
                    <button className="invite-button" onClick={handleAddInvitee}>
                        추가
                    </button>
                </div>

                <div className="invite-list">
                    {inviteList.map((user, idx) => (
                        <div key={idx} className="invite-user">
                            {user}
                            <button onClick={() => handleRemoveInvitee(user)}>❌</button>
                        </div>
                    ))}
                </div>

                <button className="submit-button" onClick={handleCreateRoom}>
                    방 만들기
                </button>
            </div>
        </div>
    );
}

export default MultiRoom;
