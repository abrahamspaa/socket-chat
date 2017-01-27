const socket = io(),
      inputMessage = document.getElementById("inputMessage"),
      messages = document.getElementById("messages");

let userName = null;

/**
  * check if it is string and return DOM or string
  *
  * @content {object / string} string or already create DOM object
  *
  * @isDOM   {Boolen} we need create DOM or Text Node
  * 
  * @return {object} DOM
 **/

 function isString(content, isDOM) {

        return typeof content === 'string' ? (isDOM ? document.createElement(content) : document.createTextNode(content)) : content;
 }


 /**
   * Create HTML DOM based on the input
   *
   * @tagName {string / object} HTML tag or DOM tag
   * @content {string / object} Content which will be published inside
   *
   *
   * @return DOM object 
   *
  **/

function htmlDOMCreater (tagName, content) {

  let htmlDOM = isString(tagName, true),
    textNode = isString(content, false);

    htmlDOM.appendChild(textNode);

    return htmlDOM;

}
        
// Get user name
function setUserName () {

   do {
     userName = prompt('Please enter your name for chat');                
   } while (!userName);
}

setUserName();


// Get the chat value
socket.on('chat', function({message, userName}) {

   let chatName = htmlDOMCreater('h4', userName),
        LI = htmlDOMCreater('li', chatName);

   messages.appendChild(htmlDOMCreater(LI, message));

});
                                            
function onChat() {

  if (inputMessage.value) {

     let messageObject = {
         message: inputMessage.value,
         userName
     };

     // setting message object in emit socket
     socket.emit('chat', messageObject);

     // clearing input value
     inputMessage.value = '';
   }

   return false;
};

