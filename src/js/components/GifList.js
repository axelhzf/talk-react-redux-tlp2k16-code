import React, {PropTypes} from "react";
import GifPreview from "./GifPreview";

export default class GifList extends React.Component {
  
  static propTypes = {
    items: PropTypes.array.isRequired,
    onToggleFav: PropTypes.func,
    onCopy: PropTypes.func
  };
  
  render() {
    const {items} = this.props;
    const cbs = _.pick(this.props, "onToggleFav", "onCopy");
    return (
      <div className="gif-list">
           {items.map((gif, index) => <GifPreview key={index} gif={gif} {...cbs} />)}
      </div>
    );
  }
  
}
