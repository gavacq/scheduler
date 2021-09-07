import axios from "axios";
import {useEffect, useState} from "react";

const MAXSPOTS = 5;
const MINSPOTS = 0;

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const updateSpots = (apptId, change) => {
    const apptDay = Math.floor((apptId - 1) / 5);

    return setState(prev => {
      return {
        ...prev,
        days: [
          ...prev.days.map(day => {
            if (day.id - 1 === apptDay) {
              const newSpots = day.spots + change;
            
              return {
                ...day,
                spots: (newSpots <= MAXSPOTS && newSpots >= MINSPOTS) ? newSpots : day.spots
              };
            }

            return day;
          })
        ]
      };
    });
  };

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
      setState(prev => {
        return {
          ...prev,
          appointments
        };
      });
      updateSpots(apptId, -1);
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
      updateSpots(apptId, 1);
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
