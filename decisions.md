## Your decisions logs
 ### First Step
    - design project structure
      This is simple app with one page.
      So I don't need to use redux, saga and router.

      services/api.service.js
        Define functions that get data from server using axios.
      services/function.service.js
        Define some helper functions that used in this project.
      components/DayButton.js, TimeButton.js
        Define reusable functional component
      App.js
        This is a simple app. So I write a calendar page component in App.js.
    - complete style work of calendar page with static availability data.
      define necessary styles in App.css
    - display data received from availability api from server using axios.
### Second Step
    - Change availability api code in server/index.js by using generateOffice365Schedule function.
    - Add some necessary dependencies such as moment-timezone, react-bootstrap and init weekdays data with slot data.
    - complete App.js file.

### What I can do in 3 hours
    I can complete First Step in 3 hours.