import React, {PropTypes} from "react";
import classNames from "classnames";

export default class Toolbar extends React.Component {
  
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id:PropTypes.string.isRequired,
        iconClass: PropTypes.string.isRequired,
        component: PropTypes.element.isRequired
      })
    ),
    active: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };
  
  renderItem = (item) => {
    const {active, onChange} = this.props;
    const isActive = item.id === active;
    let badge = null;
    if(item.badge) {
      badge = <div className="badge">{item.badge}</div>
    }
    
    return (
      <li key={item.id} className={classNames({active: isActive})}>
        <a href="#" onClick={() => onChange(item.id)}>
          <span className={item.iconClass}>
            {badge}
          </span>
        </a>
      </li>
    )
  };
  
  render() {
    const {items} = this.props;
    return (
      <div className="toolbar">
        <ul>{items.map(this.renderItem)}</ul>
      </div>
    )
  }
  
}
