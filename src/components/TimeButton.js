import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
const TimeButton = ({ timeData}) => {
  return (
    <div className="my-2 mx-2">
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip>
            {timeData.schedule.start ? (
              <>
                <div className="text-left">
                  {" "}
                  Time: {timeData.schedule.start + "~" + timeData.schedule.end}
                </div>
                <div className="text-left">
                  {" "}
                  Status: {timeData.schedule.status}{" "}
                </div>
              </>
            ) : (
              <div>No Schedule</div>
            )}
          </Tooltip>
        }
      >
        <span className="d-inline-block">
          <button
            disabled={timeData.disableFlg}
            className="btn btn-light border-secondary px-4"
            style={timeData.disableFlg ? { pointerEvents: "none" } : {}}
          >
            {timeData.hours}
          </button>
        </span>
      </OverlayTrigger>
    </div>
  );
};

export default TimeButton;
