import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/DailyPageCom/Header";
import Button from "../components/DailyPageCom/Button";
import Viewer from "../components/DailyPageCom/Viewer";

import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/get-stringed-date";

const Diary = () => {
  const params = useParams();
  const nav = useNavigate();

  const curDiaryItem = useDiary(params.id);

  if (!curDiaryItem) {
    return <div>로딩 중...</div>;
  }

  const { createdDate, emotionId, eventContent, feelingContent } = curDiaryItem;
  const title = getStringedDate(new Date(createdDate));

  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={
          <Button
            onClick={() => {
              nav(-1);
            }}
            text={"< 뒤로 가기"}
          />
        }
        rightChild={
          <Button
            onClick={() => nav(`/daily/edit/${params.id}`)}
            text={"수정하기"}
          />
        }
      />
      <Viewer
        emotionId={emotionId}
        eventContent={eventContent}
        feelingContent={feelingContent}
      />
    </div>
  );
};

export default Diary;
