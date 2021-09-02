import React from "react";

export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        // we need to use onClick here instead of onAdd
        // because we are in a normal HTML tag and not a react component.
        // We can only use reserved attributes like onClick
        onClick={props.onAdd}
      />
    </main>
  );
}
