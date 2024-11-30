import "./Editor.css";
import EmotionItem from "./EmotionItem";
import EventItem from "./EventItem";
import FeelingItem from "./FeelingItem";
import Button from "./Button";

import axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../../util/constants";
import { eventList } from "../../util/event_constants";
import { feelingList } from "../../util/feeling_constants";
import { getStringedDate } from "../../util/get-stringed-date";

const Editor = ({ initData, onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    Content: "",
    HashTag: [],
  });

  const nav = useNavigate();

  useEffect(() => {
    if (initData) {
      setInput({
        id: initData.id,
        createdDate: new Date(),
        emotionId: initData.emotionId,
        Content: initData.content,
        HashTag: initData.hashTag,
      });
    }
  }, [initData]);

  console.log(initData);

  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChangeInput = (e) => {
    // console.log(e.target.name); // 입력이 들어온 요소
    // console.log(e.target.value); // 입력된 값

    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmitButton = () => {
    console.log(input);
    onSubmit(input);
  };

  const toggleHashTag = (item, type) => {
    setInput((prev) => {
      const tagName = type === "event" ? item.eventName : item.feelingName;

      // 이미 존재하면 제거
      if (prev.HashTag.includes(tagName)) {
        return {
          ...prev,
          HashTag: prev.HashTag.filter((tag) => tag !== tagName),
        };
      }

      // 존재하지 않으면 추가
      return {
        ...prev,
        HashTag: [...prev.HashTag, tagName],
      };
    });
  };

  return (
    <div className="Editor">
      {/* <section className="date_section">
        <h4>오늘의 날짜 : </h4>

        <input
          name="createdDate"
          type="date"
          onChange={onChangeInput}
          value={getStringedDate(input.createdDate)}
        ></input>
      </section> */}

      <section className="emotion_section">
        <h4>오늘의 기분</h4>

        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>

      {/* HashTag 1 */}
      <section className="event_content_section">
        <div className="event_list_wrapper">
          {eventList.map((item) => (
            <EventItem
              onClick={() => toggleHashTag(item, "event")} // 이벤트 선택 시 기본 텍스트 설정
              key={item.eventId}
              {...item}
              isSelected={input.HashTag.includes(item.eventName)}
            />
          ))}
        </div>
      </section>

      {/* HashTag 2 */}
      <section className="feeling_content_section">
        <div className="feeling_list_wrapper">
          {feelingList.map((item) => (
            <FeelingItem
              onClick={() => toggleHashTag(item, "feeling")} // 이벤트 선택 시 기본 텍스트 설정
              key={item.feelingId}
              {...item}
              isSelected={input.HashTag.includes(item.feelingName)}
            />
          ))}
        </div>

        <section>
          <h4>선택된 해시 태그</h4>
          <div className="selected_hashtags">
            {input.HashTag.map((tag, index) => (
              <span key={index} className="hashtag">
                {tag}{" "}
              </span>
            ))}
          </div>
        </section>
      </section>

      <textarea
        name="Content"
        placeholder="오늘의 일기를 적어보세요."
        value={input.Content}
        onChange={onChangeInput}
      ></textarea>

      <section className="button_section">
        <Button onClick={() => nav(-1)} text={"취소"} />
        <Button onClick={onClickSubmitButton} text={"저장"} type={"POSITIVE"} />
      </section>
    </div>
  );
};

export default Editor;
