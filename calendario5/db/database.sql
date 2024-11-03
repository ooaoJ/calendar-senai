-- Esse é o banco de dados do projeto.

CREATE DATABASE calendario;
USE calendario;

CREATE TABLE eventos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data_evento DATE NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL
);