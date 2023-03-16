CREATE DATABASE cyber;
USE cyber;

CREATE TABLE usuarios (
    id INTEGER AUTO_INCREMENT NOT NULL,
    matricula VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE clientes (
    idMatricula INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(100),
    timesPlayed INTEGER DEFAULT 0,
    numSanciones INTEGER DEFAULT 0,
    PRIMARY KEY(idMatricula)
);

CREATE TABLE juegos (
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    available VARCHAR(5) DEFAULT 'false',
    PRIMARY KEY (id)
);

CREATE TABLE sanciones (
    idSancion INTEGER AUTO_INCREMENT NOT NULL,
    cause VARCHAR(255) NOT NULL,
    idMatricula VARCHAR(20) NOT NULL FOREIGN KEY (clients/idMatricula),
    PRIMARY KEY (idSancion)
);

CREATE TABLE registrosActividad (
    id INTEGER AUTO_INCREMENT NOT NULL,
    actionPerformed VARCHAR(255) NOT NULL,
    userPerformed VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);