// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-banner">
                <h1>Bem-vindo ao Sistema de Gestão</h1>
                <p>Gerencie desenvolvedores e níveis com facilidade.</p>
            </header>

            <section className="home-overview">
                <h2>Visão Geral</h2>
                <div className="home-overview-cards">
                    <div className="card">
                        <h3>Desenvolvedores</h3>
                        <p>Gerencie os desenvolvedores, adicione novos, edite informações existentes e remova quando necessário.</p>
                        <Link to="/desenvolvedores" className="btn btn-primary">Ver Desenvolvedores</Link>
                    </div>
                    <div className="card">
                        <h3>Níveis</h3>
                        <p>Gerencie os níveis de competência, adicione novos, edite informações existentes e remova quando necessário.</p>
                        <Link to="/niveis" className="btn btn-primary">Ver Níveis</Link>
                    </div>
                </div>
            </section>

          

        </div>
    );
}

export default Home;
