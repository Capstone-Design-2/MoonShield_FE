import { getEmotionImage } from "../../util/get-emotion-image";
import "./DiaryItem.css";
import Button from "./Button";

import { useNavigate } from "react-router-dom";

const DiaryItem = ({
  id,
  emotionId,
  createdDate,
  eventContent,
  feelingContent,
}) => {
  const nav = useNavigate();

  return (
    <div className="DiaryItem">
      <div
        onClick={() => nav(`/diary/${id}`)}
        className={`img_section img_section_${emotionId}`}
      >
        <img src={getEmotionImage(emotionId)}></img>
      </div>
      <div onClick={() => nav(`/daily/diary/${id}`)} className="text_section">
        <div className="date">{new Date(createdDate).toLocaleDateString()}</div>
        <div className="content">{`${eventContent} ${feelingContent}`}</div>
      </div>
      <div className="button_section">
        <Button onClick={() => nav(`/daily/edit/${id}`)} text={"수정"} />
      </div>
    </div>
  );
};

export default DiaryItem;
