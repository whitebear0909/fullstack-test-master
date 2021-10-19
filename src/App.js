import React, { useState, useEffect } from "react";
import "./App.css";
import { Spinner } from "react-bootstrap";
import TimeButton from "./components/TimeButton";
import DayButton from "./components/DayButton";
import { getAvailability } from "./services/api.service";
import {
  getWeekDays,
  initWeekDays,
  getGMTOffset,
  getHoursInTimeFormat,
} from "./services/function.service";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [availiability, setAvailability] = useState(null);
  const [slots, setSlots] = useState(null);
  const [selectedItem, setSelectedItem] = useState();

  const fetchData = async () => {
    let days = await getWeekDays();
    setLoading(true);
    const response = await getAvailability();
    const scheduleItems = response.data.value[0].scheduleItems;
    days = initWeekDays(days, scheduleItems);
    setAvailability(days);
    setLoading(false);
  };

  const handleDateClick = (availableSlots, btnIndex) => {
    setSelectedItem(btnIndex);
    availableSlots.map((item, index, slotsArr) => {
      slotsArr[index] = {
        time: item.time,
        hours: getHoursInTimeFormat(item.time),
        disableFlg: item.disableFlg,
        schedule: item.schedule
      };
      return null;
    });
    setSlots(availableSlots);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="container mt-5 text-center">
        <section>
          <h1>
            Your timezone: <strong>GMT {getGMTOffset()}</strong>
          </h1>
          <div className="mt-3 d-flex justify-content-center">
            {loading ? (
              <Spinner animation="border" role="status" className></Spinner>
            ) : (
              ""
            )}
            {!loading &&
              availiability &&
              availiability.map((item, index) => (
                <DayButton
                  dayData={item}
                  index={index}
                  key={index}
                  handleDateClick={handleDateClick}
                  selectedItem={selectedItem}
                />
              ))}
          </div>
          <div className="mt-3 d-flex justify-content-around">
            {slots &&
              slots.map((item, index) => (
                <TimeButton
                  timeData={item}
                  index={index}
                  key={index}
                />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
