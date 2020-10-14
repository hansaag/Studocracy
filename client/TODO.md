# Remaining implementations client side

## Cache socket ID in browsers local storage

Needed for possible reconnects in order for a host to resume a session, and to
prevent participant reconnects to bypass spam filter.

## Implement a live timer

When a host connects to a session, the timer starts for the host using the hosts browser clock, and starting time is logged to the room database table. This can be
passed to participants entering and can start the participants timer based on the time difference. The participants browser clock is used to maintain the count

## Allow lecturer to generate a pdf from session

## Allow participants to keep answering and upvoting after the lecture

Would be a clean way to keep general teacher student qeueries in one place

## Generate proper format for the question rounds

Have a static icon to add alternative, and display the added ones vertically next to
the input form.
