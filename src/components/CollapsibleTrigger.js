import React from "react";

export const CollapsibleTrigger = ({text}) => {
  return (
    <div className="collapsible-trigger">
        <div>{text}</div>
        <div>↓</div>
    </div>
  )
}

export const CollapsibleTriggerOpened = ({text}) => {
    return (
      <div className="collapsible-trigger-opened">
          <div>{text}</div>
          <div>↑</div>
      </div>
    )
  }