import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { acceptTerms } from '../user/user-actions';


class AcceptTerms extends React.Component {
    componentWillMount() {
        if (this.props.termsAcceptedAt) {
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

AcceptTerms.propTypes = {
    acceptTerms: PropTypes.func,
    termsAcceptedAt: PropTypes.string,
    history: PropTypes.any,
};

const mapStateToProps = (state) => {
    return {
        termsAcceptedAt: state.user.termsAcceptedAt,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        acceptTerms: () => dispatch(acceptTerms()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AcceptTerms));
