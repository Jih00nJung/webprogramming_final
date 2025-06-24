import React, { useRef } from "react";

const MediaControlCard = ({ audioSrc }) => {
    const audioRef = useRef(null);

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div style={{ margin: "10px 0" }}>
            <button onClick={playAudio}>🔊 듣기</button>
            <audio ref={audioRef} src={audioSrc}></audio>
        </div>
    );
};

export default MediaControlCard;
