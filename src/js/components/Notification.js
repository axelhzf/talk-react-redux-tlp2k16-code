import React from "react";
import classNames from "classnames";

export default function Notification({visible, msg}) {
  return (
    <div className={classNames("notification", {visible} )}>
      <h1>{msg}</h1>
    </div>
  );
}
