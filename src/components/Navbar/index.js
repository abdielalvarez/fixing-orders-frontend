import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/user';

const Navbar = ({
    logoutUser,
}) => {

    const history = useHistory()

    const handleLogout = () => {
        logoutUser()
        history.push('/sign-in')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid d-flex justify-content-between">
                <Link className="navbar-brand" to="/">
                    Inicio
                </Link>
                <button onClick={handleLogout} type="button" className="navbar-brand">
                    Cerrar sesión
                </button>
            </div>
        </nav>
    )
}

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
})

export default connect(null, mapDispatchToProps)(Navbar);
