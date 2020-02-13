import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { baseApiURL } from '../../../constants/variable';
import { setCurrentUser } from '../../../actions/authAction';

// import GifSpinner from '../../Spinner/GifSpinner/GifSpinner';
import '../../../stylesSheets/main.scss';
import Order from '../components/Order';

const Dashboard = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tabs, settabs] = React.useState({
    isOrders: true,
    isCart: false,
    isWishList: false,
    Settings: false
  });

  React.useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios({
          url: `${baseApiURL}/customer/api/detail`,
          method: 'get',
          withCredentials: true
        });
        props.setCurrentUser(res.data);
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        props.setCurrentUser({});
        props.history.push('/login');
        // console.log('something went wrong when fetching the user data', err);
      }
    };
    if (!props.auth.isAuthenticate) {
      getCurrentUser();
    }
  }, [props.auth]);

  const toggleTabs = tabName => {
    const tempTabs = { ...tabs };
    const tbsMap = Object.keys(tempTabs);
    tbsMap.forEach(tb => {
      if (tb === tabName) {
        tempTabs[tb] = true;
      } else tempTabs[tb] = false;
    });
    settabs({ ...tabs, ...tempTabs });
  };

  // React.useLayoutEffect(() => {
  //   if (isError && !isAuthenticated) {
  //     props.history.push('/signin');
  //   }
  // }, [isError]);

  return (
    <>
      {isAuthenticated && (
        <div className='container__of-dashboard'>
          <div className='content'>
            <nav className='sidebar'>
              <ul className='side-nav'>
                <li
                  className={
                    tabs.isOrders
                      ? 'side-nav__item side-nav__item--active'
                      : ' side-nav__item'
                  }
                  onClick={() => toggleTabs('isOrders')}
                >
                  <a href='##' className='side-nav__link'>
                    <i className='fa fa-first-order'></i>
                    <span className='side-nav__text'>Orders</span>
                  </a>
                </li>
                {/* <li
                  className={
                    tabs.isCart
                      ? 'side-nav__item side-nav__item--active'
                      : ' side-nav__item'
                  }
                  onClick={() => toggleTabs('isCart')}
                >
                  <a href="#" className="side-nav__link">
                    <i className="fa fa-shopping-cart"></i>
                    <span className="side-nav__text">Cart</span>
                  </a>
                </li> */}
                {/* <li
                  className={
                    tabs.isWishlist
                      ? 'side-nav__item side-nav__item--active'
                      : ' side-nav__item'
                  }
                  onClick={() => toggleTabs('isWishlist')}
                >
                  <a href="#" className="side-nav__link">
                    <i className="fa fa-heart"></i>
                    <span className="side-nav__text">Wishlist</span>
                  </a>
                </li> */}

                {/* <li
                  className={
                    tabs.isSettings
                      ? 'side-nav__item side-nav__item--active'
                      : ' side-nav__item'
                  }
                  onClick={() => toggleTabs('isSettings')}
                >
                  <a href="#" className="side-nav__link">
                    <i className="fa fa-cog"></i>
                    <span className="side-nav__text">Settings</span>
                  </a>
                </li> */}
              </ul>
            </nav>
            <main className='dashboard__main-content'>
              {tabs.isOrders ? <Order /> : ''}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProp = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProp, { setCurrentUser })(
  withRouter(Dashboard)
);
