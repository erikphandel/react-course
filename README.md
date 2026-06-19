Chatbot code for the React course by SuperSimpleDev, with added functionalities from exercizes provided by him
Class link: https://www.youtube.com/watch?v=TtPXvEcE11E

The course includes this chatbot as an introduction to React, and the e-commerce project diving into more complex aspects of React. The e-commerce project can be found on the ecommerce-project and ecommerce-backend folders.

Functions added:
- Inputted text is sent when the Enter key is pressed and erased when the Escape key is pressed
- Made sendMessage an async function, added loading gif when waiting for chatbot, disabled input when waiting for chatbot
- Added custom hook useAutoScroll(), which autoscrolls the chat container when sending a new message
- Added welcome message for when the page is loaded empty