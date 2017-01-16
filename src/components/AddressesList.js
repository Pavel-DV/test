import React, {Component, PropTypes} from 'react';

import {List, makeSelectable, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
    return class SelectableList extends Component {
        static propTypes = {
            children: PropTypes.node.isRequired,
            //defaultValue: PropTypes.number.isRequired,
            activeAddress: PropTypes.string.isRequired,
        };

        componentWillMount() {
            this.setState({
                // selectedIndex: this.props.defaultValue,
            });
        }

        handleRequestChange = (event, index) => {
            this.props.setActiveAddressFunc(index);
            this.setState({
                selectedIndex: index
            });
        };

        render() {
            return (
                <ComposedComponent
                    value={this.props.activeAddress}
                    onChange={this.handleRequestChange}
                >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}

SelectableList = wrapState(SelectableList);
const AddressesList = ({ addresses, setActiveAddressFunc, activeAddress }) => (
    <SelectableList setActiveAddressFunc={setActiveAddressFunc} activeAddress={activeAddress}>
        <Subheader>Smart Contract Addresses:</Subheader>
        {Object.keys(addresses).map(address =>
            <ListItem
                value={address}
                key={address}
                primaryText={address}
            />
        )}
    </SelectableList>
);

AddressesList.propTypes = {
    addresses: PropTypes.object.isRequired,
    setActiveAddressFunc: PropTypes.func.isRequired,
    activeAddress: PropTypes.string.isRequired
};

export default AddressesList