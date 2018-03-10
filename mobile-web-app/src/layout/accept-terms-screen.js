import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { acceptTerms } from '../user/user-actions';


class AcceptTermsScreen extends React.Component {
    render() {
        return (
            <div>
                The accept terms page
                <button onClick={this.props.acceptTerms}>Accept terms</button>
            </div>
        );
    }
}

AcceptTermsScreen.propTypes = {
    acceptTerms: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
    return {
        acceptTerms: () => dispatch(acceptTerms()),
    };
};

export default connect(undefined, mapDispatchToProps)(AcceptTermsScreen);
