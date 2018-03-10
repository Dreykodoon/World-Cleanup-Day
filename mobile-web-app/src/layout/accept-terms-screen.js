import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { acceptTerms } from '../user/user-actions';


class AcceptTermsScreen extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.termsAccepted) {
            this.props.history.push('/main/camera');
        }
    }

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
    termsAccepted: PropTypes.bool,
    acceptTerms: PropTypes.func,
    history: PropTypes.any,
};

const mapStateToProps = (state) => {
    return {
        termsAccepted: state.user.termsAccepted,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        acceptTerms: () => dispatch(acceptTerms()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AcceptTermsScreen));
