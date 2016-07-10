import React from "react";

export default function ErrorMessage ({msg = "Something went wrong"}) {
  return (
    <div className="error-msg">
      {msg}
    </div>
  )
}
