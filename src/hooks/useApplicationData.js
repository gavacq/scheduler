import axios from "axios";
import {useEffect, useState} from "react";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({
    ...state,
    day
  });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(
      `/api/appointments/${id}`,
      {interview}
    ).then(() => {
      setState(prev => {
        return {
          ...prev,
          appointments
        };
      });
    });
  };

  const deleteInterview = apptId => {
    const appointment = {
      ...state.appointments[apptId],
      interview: null
    };

    return axios.delete(
      `/api/appointments/${apptId}`
    ).then(() => {
      setState(prev => {
        return {
          ...prev,
          appointments: {
            ...prev.appointments,
            [apptId]: appointment
          }
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
