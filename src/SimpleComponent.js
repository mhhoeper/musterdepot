import React from "react";

export default class SimpleComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span className="text">g{this.props.keynr}a</span>
      </div>
    );
  }
}
