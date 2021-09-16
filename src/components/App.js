import { Layout } from "antd";
import "../styles/App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import MoviesPage from "../pages/MoviesPage";
import TodosPage from "../pages/TodosPage";
import AboutPage from "../pages/AboutPage";
import MainMenu from "./MainMenu";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import logo from '../images/HomePageIMG/LogoUn.jpg';
import TestsPage from "../pages/TestsPage";
import VisionPage from "../pages/VisionPage";

const { Header, Footer, Content } = Layout;

function App() {
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log("uid", uid);
                setAuthUser(user);
            } else {
                // User is signed out
                console.log("No hay ssesion activa", user);
                setAuthUser(false);
            }
        });
    }, []);

    return (
        <Router>
            <Layout>
                <Header className="main-header">
                    <div className="logo">Películas</div>
                    <MainMenu user={authUser} />

                </Header>
                <Content>
                    <Switch>
                        <Route path="/acerca-de">
                            <AboutPage />
                        </Route>
                        <Route path="/tareas">
                            {authUser === null ? (
                                "Cargando..."
                            ) : authUser === false ? (
                                <Redirect to="/iniciar-sesion" />
                            ) : (
                                <TodosPage userId={authUser.uid} />
                            )}
                        </Route>
                        <Route path="/test">
                            <TestsPage />
                        </Route>
                        <Route path="/VisioTest">
                            <VisionPage />
                        </Route>
                        <Route path="/netflix">
                            <MoviesPage />
                        </Route>
                        <Route path="/registro">
                            {authUser === null ? (
                                "Cargando..."
                            ) : authUser === false ? (
                                <RegisterPage />
                            ) : (
                                <Redirect to="/tareas" />
                            )}
                        </Route>
                        <Route path="/iniciar-sesion">
                            {authUser === null ? (
                                "Cargando..."
                            ) : authUser === false ? (
                                <LoginPage />
                            ) : (
                                <Redirect to="/tareas" />
                            )}
                        </Route>
                        <Route path="/">
                            <HomePage />
                        </Route>
                    </Switch>
                </Content>
                <Footer>
                    <div className="row ldc justify-content-md-center my-3">

                        <div className="col-12 col-md-3 box">
                            <h2 >Contacto</h2>
                            <div>
                                <p>Email: info@designerassets.in</p>
                                <p>Telefono: +91 9810744656</p>
                            </div>
                        </div>

                        <div className="col-12 col-md-3 box">
                            <h2 >Redes Sociales</h2>
                            <div>
                                <p>Facebook</p>
                                <p>Twitter</p>
                                <p>Instagram</p>
                            </div>

                        </div>

                        <div className="col-12 col-md-3 box">
                            <h2 >Servicios</h2>
                            <div>
                                <p>Mi perfil visual</p>
                                <p>Compruebe su vision en linea</p>
                                <p>Informacion sobre riesgos residuales</p>
                            </div>

                        </div>

                        <div align = "center" className="col-12 col-md-3">
                            <img src={logo} className="App-logo, imgRedonda" alt="logo" />
                        </div>

                    </div>
                   </Footer>
            </Layout>
        </Router>
    );
}

export default App;