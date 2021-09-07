import axios from "axios";
import {useEffect, useState} from "react";

import {updateSpots} from "helpers/selectors";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => {
    return {
      ...prev,
      day
    };
  });

  const bookInterview = (apptId, interview) => {
    const appointment = {
      ...state.appointments[apptId],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [apptId]: appointment
    };

    return axios.put(
      `/api/appointments/${apptId}`,
      {interview}
    ).then(() => {
      const days = updateSpots(state, appointments);
      setState(prev => {
        return {
          ...prev,
          appointments,
          days
        };
      });
    });
  };

  const deleteInterview = apptId => {
    const appointment = {
      ...state.appointments[apptId],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [apptId]: appointment
    };

    return axios.delete(
      `/api/appointments/${apptId}`
    ).then(() => {
      const days = updateSpots(state, appointments);
      setState(prev => {
        return {
          ...prev,
          appointments,
          days
        };
      });
    });
  };

  console.log("state", state);

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(res => {
      setState(prev => {
        return {
          ...prev,
          days: res[0].data,
          appointments: res[1].data,
          interviewers: res[2].data
        };
      });
    }).catch(res => console.log("Error:", res.message));
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  };
};

export default useApplicationData;
