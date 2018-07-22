$(function() {
  const getParams = window.location.href.split("?")[1];

  $.ajax({
    url: `http://localhost:5000/tweetStatus/?${getParams}`,
    success: data => {
      console.log(data);

      const dateConfiguration = Object.entries(data).map(
        ([dateKey, result]) => {
          const event = {
            start: new Date(dateKey),
            end: new Date(dateKey),
            allDay: true,
            color: result.hasHashTag ? "green" : "red",
          };

          if (result.hasHashTag) {
            event.url = "https://twitter.com/i/web/status/" + result.id_str;
          }
          return event;
        }
      );

      $("#calendar").fullCalendar({
        fixedWeekCount: false,
        contentHeight: 450,
        events: dateConfiguration,

        eventClick: function(event) {
          if (event.url) {
            window.open(event.url);
            return false;
          }
        }
      });
    }
  });
});
