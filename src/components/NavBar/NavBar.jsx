import styles from './NavBar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg'
import { useContext } from 'react';
import { tokenContext } from '../../context/token.js';
import { cartContext } from '../../context/cartContext.js';

function NavBar() {
  let { token, setToken } = useContext(tokenContext)
  let { totalCartItem } = useContext(cartContext)
  let navigate = useNavigate()
  function logout() {
    localStorage.removeItem("userToken")
    setToken(null)
    navigate('/signin')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to={"#"}>
            <img src={logo} alt="" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={""}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"products"}>Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"categories"}>Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"brands"}>Brands</Link>
              </li>
            </ul> : null}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <li className="nav-item d-flex align-items-center gap-2">
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-linkedin-in"></i>
              </li>


              {token ? <><li className="nav-item">
                <button className="nav-link active" onClick={logout}>LogOut</button>
              </li>
                <li className="nav-item position-relative">
                  <Link className="nav-link active" aria-current="page" to={"carts"}><i className='fa fa-shopping-cart text-main'></i><span className='p-1 rounded bg-main text-white position-absolute top-0 end-5'>{totalCartItem}</span></Link>
                </li>
              </>
                : <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"register"}>Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"signin"}>LogIn</Link>
                  </li>
                </>}

            </ul>
          </div>
        </div>
      </nav>
    </>

  )
}



export default NavBar;
