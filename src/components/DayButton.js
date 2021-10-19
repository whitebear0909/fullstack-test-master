import React from "react";

const DayButton = ({ dayData, index, handleDateClick, selectedItem }) => {
  return (
    <div
      id={"dayBtn_" + index}
      className={`mx-1 my-1 px-5 py-2 border text-white day-item rounded border-5 ${
        selectedItem === index
          ? "border-primary bg-white text-primary"
          : "border-grey bg-secondary"
      }`}
      key={index}
      onClick={() => handleDateClick(dayData.times, index)}
    >
      <div>
        <span className="h5">
          {dayData.month}&nbsp;{dayData.dayNum}
        </span>
        <span>th</span>
      </div>
      <h4>{dayData.week}</h4>
    </div>
  );
};

export default DayButton;
