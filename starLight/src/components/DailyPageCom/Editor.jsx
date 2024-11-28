import "./Editor.css";
import EmotionItem from "./EmotionItem";
import EventItem from "./EventItem";
import FeelingItem from "./FeelingItem";
import Button from "./Button";

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
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    console.log(e.target.name); // 입력이 들어온 요소
    console.log(e.target.value); // 입력된 값

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
    onSubmit(input);
  };

  const onSelectEvent = (item) => {
    // setInput((prev) => ({
    //   ...input,
    //   ...prev,
    //   eventId: item.eventId,
    //   eventName: input.eventName,
    //   HashTag: Array.isArray(prev.HashTag)
    //     ? prev.HashTag.map((tag, index) => (index === 0 ? item.eventName : tag))
    //     : ["", item.eventName],
    // }));
    addHashTag(item.eventName);
  };

  const onSelectFeeling = (item) => {
    // setInput((prev) => ({
    //   ...input,
    //   feelingId: item.feelingId,
    //   feelingName: input.feelingName,
    //   HashTag: Array.isArray(prev.HashTag)
    //     ? prev.HashTag.map((tag, index) =>
    //         index === 0 ? item.feelingName : tag
    //       )
    //     : ["", item.feelingName],
    // }));
    addHashTag(item.feelingName);
  };

  const addHashTag = (tag) => {
    setInput((prev) => {
      // 해시 태그가 이미 배열에 있다면 추가하지 않음
      if (prev.HashTag.includes(tag)) return prev;

      return {
        ...prev,
        HashTag: [...prev.HashTag, tag],
      };
    });
  };

  const removeHashTag = (tag) => {
    setInput((prev) => ({
      ...prev,
      HashTag: prev.HashTag.filter((t) => t !== tag), // 선택된 태그 제거
    }));
  };

  console.log(input.HashTag);

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜 : </h4>

        <input
          name="createdDate"
          type="date"
          onChange={onChangeInput}
          value={getStringedDate(input.createdDate)}
        ></input>
      </section>

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
        {/* <h4>있었던 일</h4> */}

        <div className="event_list_wrapper">
          {eventList.map((item) => (
            <EventItem
              onClick={() => onSelectEvent(item)} // 이벤트 선택 시 기본 텍스트 설정
              key={item.eventId}
              {...item}
              isSelected={item.eventId === input.eventId}
            />
          ))}
        </div>

        {/* <textarea
          name="eventContent"
          value={input.eventContent}
          onChange={onChangeInput}
          placeholder="~한 일이 있어서..."
        ></textarea> */}
      </section>

      {/* HashTag 2 */}

      <section className="feeling_content_section">
        {/* <h4>오늘 느낀 감정</h4> */}

        <div className="feeling_list_wrapper">
          {feelingList.map((item) => (
            <FeelingItem
              onClick={() => onSelectFeeling(item)} // 이벤트 선택 시 기본 텍스트 설정
              key={item.feelingId}
              {...item}
              isSelected={item.feelingId === input.feelingId}
            />
          ))}
        </div>

        <section>
          <h4>선택된 해시 태그</h4>
          <div className="selected_hashtags">
            {input.HashTag.map((tag, index) => (
              <span key={index} className="hashtag">
                {tag}{" "}
                <button
                  onClick={() => removeHashTag(tag)} // 태그 제거 버튼
                  style={{
                    border: "none",
                    borderRadius: 15,
                    background: "red",
                    color: "black",
                    cursor: "pointer",
                  }}
                >
                  ✖{" "}
                </button>
              </span>
            ))}
          </div>
        </section>

        {/* <textarea
          name="feelingContent"
          value={input.feelingContent}
          onChange={onChangeInput}
          placeholder="~했어..."
        ></textarea> */}
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
