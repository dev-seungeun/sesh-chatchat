import { useNavigate } from "react-router-dom";

export function _sendNotification(title, option, callback) {

  if (!("Notification" in window)) {
    return;
  }

  if (Notification.permission !== "granted") {
    try {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") return;
      });
    } catch (error) {
      if (error instanceof TypeError) {
        Notification.requestPermission((permission) => {
          if (permission !== "granted") return;
        });
      } else {
        console.error(error);
      }
    }
  }else {
    var notification = new Notification(title, option);
    notification.onclick = function(event) {
      event.preventDefault();
      window.focus();
      callback && callback(option.roomName);
    }
  }

};
