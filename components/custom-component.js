const React = require('react');
const IdyllComponent = require('idyll-component');

class CustomComponent extends IdyllComponent {
  render() {
    return (
      <div {...this.props}>
        Custom component foo is {this.props.foo}
      </div>
    );
  }
}

module.exports = CustomComponent;
