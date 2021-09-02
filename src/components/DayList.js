import React from "react";
import DayListItem from "./DayListItem";

// props are passed from the Application component in <DayList />
export default function DayList(props) {
  // // everytime I use day, I am referring to props.day
  // const {day, setDay, days} = props;

  const dayListItems =  props.days.map(day => {
    return <DayListItem
    // create props for DayListItem and pass to the component
      key={day.id}
      name={day.name}
      spots={day.spots}
      // name prop for DayListItem === day prop for DayList
      // selected is a BOOLEAN
      //day.name does not change but props.day changes depending on what has been clicked on
      selected={day.name === props.day}
      // setDay for DayListItem === setDay prop for DayList
      // prop drilling: passing down the state from Application down to DayListItem
      setDay={props.setDay} />;
  });

  // return each element of the new mapped array
  return (
    <ul>
      {dayListItems}
    </ul>
  );
}
