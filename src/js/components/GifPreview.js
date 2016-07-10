import React, {PropTypes} from "react";
import classNames from "classnames";
import CopyToClipboard from 'react-copy-to-clipboard';

export default class GifPreview extends React.Component {
  
  static propTypes = {
    onToggleFav: PropTypes.func,
    onCopy: PropTypes.func
  };
  
  onToggleFav = e => {
    if (this.props.onToggleFav) {
      this.props.onToggleFav(this.props.gif);
    }
  };
  
  onCopy = e => {
    if (this.props.onCopy) {
      this.props.onCopy(this.props.gif)
    }
  };
  
  render() {
    const {gif} = this.props;
    
    if (!gif.url) return null;
    
    return (
      <div className="gif-preview">
        <img src={gif.url}/>
        
        <div className="fav" onClick={this.onToggleFav}>
          <i className={classNames("fa", gif.isFavorite ? "fa-heart" : "fa-heart-o")}/>
        </div>
        
        <CopyToClipboard text={gif.url} onCopy={this.onCopy}>
          <div className="clipboard">
            <i className="fa fa-clipboard"/>
          </div>
        </CopyToClipboard>
      
      </div>
    );
  }
  
}
