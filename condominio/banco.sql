drop database condominio;
create database condominio; 
use condominio; 

create table funcionarios (
	id int primary key not null auto_increment,
    nome varchar(255) not null,
    senha varchar(255) not null, 
    status enum ('ativo', 'inativo') default ('ativo'),
    created_at timestamp default current_timestamp
);

create table moradores(
	id int primary key not null auto_increment,
    nome varchar(255) not null, 
    bloco varchar(255) not null,
    apartamento varchar(255) not null, 
    telefone varchar(255) not null,
    email varchar(255) not null,
    tipo varchar(255) not null,
    created_at timestamp default current_timestamp
);

create table carros(
	id int primary key not null auto_increment,
    placa varchar(255) not null,
    modelo varchar(255) not null,
    cor varchar(255) not null, 
    box varchar(255) not null,
    id_morador int not null, 
    foreign key (id_morador) references moradores(id)
);

insert into funcionarios(nome, senha) values ("teste", "teste");