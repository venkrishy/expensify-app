import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info: </h1>
        <p> The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>Please don't share !!</p>}
            <WrappedComponent {...props} />
        </div>
    )
};

const requireAuthenticationInfo = (WrappedComponent) => {
    return (props) => (
        <div>
            {
                props.isAuthenticated ? (
                    <WrappedComponent {...props} />
                ) : (
                        <p>Please Login to view the info</p>
                    )
            }
        </div>
    )
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthenticationInfo(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="These are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="Welcome User" />, document.getElementById('app'));