import React from "react";
import DayListItem from "./DayListItem";

const DayList = props => {
  return (
    <ul>
      {props.days.map(day => {
        return <DayListItem
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay}
          key={day.id} />;
      })}
    </ul>
  );
};

export default DayList;
