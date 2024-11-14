import { getEmotionImage } from "../util/get-emotion-image";

import "./Viewer.css";
import { emotionList } from "../util/constants";

const Viewer = ({ emotionId, eventContent, feelingContent }) => {
  const emotionItem = emotionList.find(
    (item) => String(item.emotionId) === String(emotionId)
  );

  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>그날의 기분</h4>
        <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
          <img src={getEmotionImage(emotionId)}></img>
          <div>{emotionItem.emotionName}</div>
        </div>
      </section>
      <section className="content_section">
        <h4>그날의 일기</h4>
        <div className="content_wrapper">
          <p>{`${eventContent} ${feelingContent}`}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
