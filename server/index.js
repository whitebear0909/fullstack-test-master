var { generateOffice365Schedule } = require("./utils/schedule")
var { now } = require("./utils/dateHelper");

var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
var port = 8080;

app.get('/availability', function (req, res) {
    
    // STEP 1 use a mock response and display on the client
    //const response = generateMockUpResponse()

    // STEP 2 generate real data and convert to expected format
    const from_date = now().startOf('week');
    const to_date = now().endOf('week');
    const data = generateOffice365Schedule(from_date, to_date)
    return res.send(data);
});

function generateMockUpResponse() {
    const d1 = now().set({ hour: 10 });
    const d2 = d1.plus({ hours: 1, days: 1 });

    return [
        {
          date: d1.toFormat("dd/MM/yyyy"),
          availableSlots: [
            { startTime: "9:00", endTime: "10:00" },
            { startTime: "10:00", endTime: "11:00" }
          ]
        },
        {
          date: d2.toFormat("dd/MM/yyyy"),
          availableSlots: [
            { startTime: "15:00", endTime: "16:00" },
            { startTime: "16:00", endTime: "17:00" }
          ]
        }
      ];
}
  
app.listen(port, () => console.log(`App listening on port ${port}!`))