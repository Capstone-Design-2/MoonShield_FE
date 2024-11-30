import { getEmotionImage } from "../../util/get-emotion-image";
import "./DiaryItem.css";
import Button from "./Button";

import { useNavigate } from "react-router-dom";

const DiaryItem = (data) => {
  const nav = useNavigate();

  return (
    <div className="DiaryItem">
      <div
        onClick={() => nav(`/diary/${data.data.id}`)}
        className={`img_section img_section_${data.data.emotionId}`}
      >
        <img src={getEmotionImage(data.data.emotionId)}></img>
      </div>
      <div
        onClick={() => nav(`/daily/diary/${data.data.date}`)}
        className="text_section"
      >
        <div className="date">
          {`${data.data.date.substring(0, 4)}.
            ${data.data.date.substring(4, 6)}.
            ${data.data.date.substring(6, 8)}`}
        </div>
        <div className="hashTag">{data.data.hashTag}</div>
      </div>
      <div className="button_section">
        <Button
          onClick={() => nav(`/daily/edit/${data.data.date}`)}
          text={"수정"}
        />
      </div>
    </div>
  );
};

export default DiaryItem;
