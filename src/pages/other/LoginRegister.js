import PropTypes from "prop-types";
import React, { Fragment, useContext, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom"; // Import useHistory hook
import { UserContext } from "../../App";

const URL = "http://localhost:3001/api/v1/users";

const LoginRegister = ({ location }) => {
  const user = useContext(UserContext);
  const { addToast } = useToasts();
  const { pathname } = location;
  const [key, setKey] = useState("login");

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const toggleAuth = () => {
    setUsername("");
    setPassword("");
    setEmail("");
  };

  const history = useHistory(); // Initialize useHistory hook

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    async function getUsers() {
      const response = await fetch(URL);
      const result = await response.json();
      return result;
    }
    const users = await getUsers();
    const isUserExist = users.find((user) => user.username === username && user.password === password);
    if (isUserExist) {
      addToast("Login success", { appearance: "success", autoDismiss: true, PlacementType: "top-left" });
      localStorage.setItem("user", JSON.stringify(isUserExist));
      user.setUser({ id: isUserExist.id, name: username, password, email: isUserExist.email });
      history.push(process.env.PUBLIC_URL + "/"); // Replace with your actual homepage path
    } else {
      addToast("Login failed", { appearance: "error", autoDismiss: true, PlacementType: "top-left" });
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    async function postData(url = "", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      const result = await response.json();
      return result; // parses JSON response into native JavaScript objects
    }
    const result = await postData(URL, { username, password, email });
    if (result.status === 404) {
      addToast(result.message, { appearance: "error", autoDismiss: true, PlacementType: "top-left" });
    } else if (result.status === 200) {
      addToast(result.message, { appearance: "success", autoDismiss: true, PlacementType: "top-left" });
      setKey("login");
    }
    console.log(result);
  };

  return (
    <Fragment>
      <MetaTags>
        <title>TechZones | Login</title>
        <meta name="description" content="Compare page of techzones react minimalist eCommerce template." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Đăng nhập - Đăng kí</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login" activeKey={key} onSelect={(k) => setKey(k)}>
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login" onClick={toggleAuth}>
                          <h4>Đăng nhập</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register" onClick={toggleAuth}>
                          <h4>Đăng kí</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Tên đăng nhập"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Ghi nhớ</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>Quên mật khẩu?</Link>
                                </div>
                                <button type="submit" onClick={handleLoginSubmit}>
                                  <span>Đăng nhập</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Tên đăng nhập"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <div className="button-box">
                                <button type="submit" onClick={handleRegisterSubmit}>
                                  <span>Đăng kí</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object,
};

export default LoginRegister;
