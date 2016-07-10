import React, {PropTypes} from "react";

export default class SearchBox extends React.Component {
  
  static propTypes = {
    initialValue: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };
  
  state = {
    value: this.props.initialValue
  };
  
  onChange = e => {
    this.setState({value: e.target.value});
  };
  
  onSubmit = e => {
    e.preventDefault();
    this.props.onChange(this.state.value);
  };
  
  render() {
    return (
      <div className="search-box">
        <div className="search-icon">
          <i className="fa fa-search"/>
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="Search..." value={this.state.value} onChange={this.onChange}/>
        </form>
      </div>
    )
  }
  
}
