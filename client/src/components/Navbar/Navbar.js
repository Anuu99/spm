import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'; 
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import cakeshoplogo from '../../images/cakeshoplogo.jpg';
import cakeshopText from '../../images/cakeshopText.jpg';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT'});

        history.push('/');

        setUser(null);
        };

    useEffect(() => {
        const token = user?.token;

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
         <Link to="/" className={classes.brandContainer}>
            <img src={cakeshopText} alt="icon" height="70px" />
            <img className={classes.image} src={cakeshoplogo} alt="CakeShop" height="70px" />
         </Link>
         <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button varient="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>

            ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}
         </Toolbar>
        </AppBar>
    );
};


export default Navbar