package com.felipesalles.dao;

import com.felipesalles.excecao.EventoNaoEncontradoException;
import com.felipesalles.modelo.Evento;

import java.util.List;


public interface EventoDAO
{
	long inclui(Evento umEvento);
	void altera(Evento umEvento) throws EventoNaoEncontradoException;
	void exclui(long id) throws EventoNaoEncontradoException;
	Evento recuperaUmEvento(long numero) throws EventoNaoEncontradoException;
	List<Evento> recuperaEventos();
}