import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { acceptTerms } from '../user/user-actions';
import { isUserLoggedIn } from '../authentication/auth-reducers';


class AcceptTermsScreen extends React.Component {
    componentWillMount() {
        if (!this.props.loggedIn) {
            this.props.history.push('/login');
        }
        else if (this.props.termsAcceptedAt) {
            this.props.history.push('/main/camera');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.termsAcceptedAt) {
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
    acceptTerms: PropTypes.func,
    termsAcceptedAt: PropTypes.string,
    loggedIn: PropTypes.bool,
    history: PropTypes.any,
};

const mapStateToProps = (state) => {
    return {
        termsAcceptedAt: state.user.termsAcceptedAt,
        loggedIn: isUserLoggedIn(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        acceptTerms: () => dispatch(acceptTerms()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AcceptTermsScreen));
