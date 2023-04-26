CREATE DATABASE ciber;
USE ciber;

CREATE TABLE users (
    id INTEGER AUTO_INCREMENT NOT NULL,
    tag VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE clients (
    idTag INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(100),
    timesPlayed INTEGER DEFAULT 0,
    numSanctions INTEGER DEFAULT 0,
    PRIMARY KEY(idMatricula)
);

CREATE TABLE games (
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    available VARCHAR(5) DEFAULT 'false',
    PRIMARY KEY (id)
);

CREATE TABLE sanctions (
    idSancion INTEGER AUTO_INCREMENT NOT NULL,
    cause VARCHAR(255) NOT NULL,
    idTag VARCHAR(20) NOT NULL FOREIGN KEY (clients/idTag),
    PRIMARY KEY (idSancion)
);

CREATE TABLE logs (
    idLog INTEGER AUTO_INCREMENT NOT NULL,
    actionPerformed VARCHAR(255) NOT NULL,
    idTag VARCHAR(255) NOT NULL,
    PRIMARY KEY (idLog)
);