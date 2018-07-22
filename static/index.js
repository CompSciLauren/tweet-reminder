$(function() {

  $.ajax({
      url: 'http://localhost:5000/tweetStatus',
      success: (data) => {
          console.log(data)

          const dateConfiguration = Object.entries(data).map(([dateKey, wasThereTweetForDay]) => {
            const event = {
                start: new Date(dateKey),
                end: new Date(dateKey),
                allDay: true,
                color: wasThereTweetForDay ? "green" : "red",
              };
              return event;
          });
                  
          $("#calendar").fullCalendar({
            fixedWeekCount: false,
            contentHeight: 450,
            events: dateConfiguration,
          });
      }
  })
});
