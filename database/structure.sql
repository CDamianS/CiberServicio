CREATE DATABASE cyber;
USE cyber;

CREATE TABLE users (
    id INTEGER AUTO_INCREMENT NOT NULL,
    matricula VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE juegos (
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(127) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE sanciones (
    idSancion INTEGER AUTO_INCREMENT NOT NULL,
    cause VARCHAR(255),
    idMatricula VARCHAR(20) NOT NULL FOREIGN KEY (users/matricula),
    PRIMARY KEY (idSancion)
);

CREATE TABLE log (
    id INTEGER AUTO_INCREMENT NOT NULL,
    actionPerformed VARCHAR(255),
    userPerformed VARCHAR(255),
    PRIMARY KEY (id)
);