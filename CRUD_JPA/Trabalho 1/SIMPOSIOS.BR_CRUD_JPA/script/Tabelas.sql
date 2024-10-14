https://dev.mysql.com/downloads/

Download MySQL Community Server

Últimas versões:
- 5.5
- 5.6
- 5.7
- 8.0 (atual)

DROP TABLE if exists banco.evento;

CREATE TABLE banco.evento (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(30) NOT NULL,
  data_evento DATE NOT NULL,
  data_cadastro DATE NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB
CHARACTER SET utf8mb4;

-- InnoDB is a general-purpose storage engine that balances high reliability and high
-- performance. In MySQL 8.0, InnoDB is the default MySQL storage engine. Unless you
-- have configured a different default storage engine, issuing a CREATE TABLE statement
-- without an ENGINE clause creates an InnoDB table.

-- MySQL supports multiple Unicode character sets: utf8mb4 : A UTF-8 encoding of the
-- Unicode character set using one to four bytes per character.

INSERT INTO banco.evento(NOME, DATA_EVENTO, DATA_CADASTRO)
VALUES('SBCAS 2024', '2020-04-20', curdate());

INSERT INTO banco.evento(NOME, DATA_EVENTO, DATA_CADASTRO)
VALUES('SBRC 2024', '2020-04-29', curdate());
