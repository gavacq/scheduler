import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  // if you use this below, don't need to use props.
  // if we use props. then you don't need the line below as long as the props are
  // defined in the place where we call the component <Component />
  // const { name, spots, selected, setDay } = props;

  // adding classes conditionally
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "button--danger": props.spots === 0
  });

  // FUNCTION: formatSpots 🍞
  // conditionally renders text depending on how many spots are remaining.
  // we are accessing props thru the outer scope of the main function
  const formatSpots = () => {
    if (props.spots === 0) {
      return "no spots remaining";
    } else if (props.spots === 1) {
      return "1 spot remaining";
    } else {
      return `${props.spots} spots remaining`;
    }
  };

  // Return each DayListItem as <li> inside the <ul> from DayList
  return (
    <li
      // these props get compiled by react into HTML attributes directly
      // dayClass is the return value of calling classNames function
      className={dayClass}
      // run setDay with the HTML name (day of the week) of the component we clicked on
      // setDay is defined in Application.js as a prop
      onClick={() => props.setDay(props.name)}>

      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
