package com.felipesalles.dao.impl;

import com.felipesalles.dao.EventoDAO;
import com.felipesalles.excecao.EventoNaoEncontradoException;
import com.felipesalles.modelo.Evento;
import com.felipesalles.util.FabricaDeEntityManager;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.LockModeType;
import java.util.List;

public class JPAEventoDAO implements EventoDAO
{
	public JPAEventoDAO() {

	}

	public long inclui(Evento umEvento)
	{
		EntityManager em = null;
		EntityTransaction tx = null;

		try
		{	// transiente - objeto novo: ainda não persistente
			// persistente - após ser persistido
			// destacado - objeto persistente não vinculado a um entity manager
			em = FabricaDeEntityManager.criarEntityManager();
			tx = em.getTransaction();
			tx.begin();;

			em.persist(umEvento);

			// umEvento.setNome("abc");

			tx.commit();

			return umEvento.getId();
		}
		catch(RuntimeException e)
		{	if (tx != null)
			{
				tx.rollback();
			}
			throw e;
		}
		finally
		{
			em.close();
		}
	}

	public Evento recuperaUmEvento(long numero) throws EventoNaoEncontradoException
	{
		EntityManager em = null;

		try
		{
			em = FabricaDeEntityManager.criarEntityManager();

			Evento umEvento = em.find(Evento.class, numero);
			// umEvento = em.find(Evento.class, numero);

			// Características no método find():
			// 1. É genérico: não requer um cast.
			// 2. Retorna null caso a linha não seja encontrada no banco.

			if(umEvento == null)
			{	throw new EventoNaoEncontradoException("Evento não encontrado");
			}
			return umEvento;
		}
		finally
		{   em.close();
		}
	}

	public void altera(Evento umEvento) throws EventoNaoEncontradoException
	{
		EntityManager em = null;
		EntityTransaction tx = null;
		Evento evento = null;
		try
		{
			em = FabricaDeEntityManager.criarEntityManager();
			tx = em.getTransaction();
			tx.begin();

			evento = em.find(Evento.class, umEvento.getId(), LockModeType.PESSIMISTIC_WRITE);
			if (evento == null) {
				tx.rollback();
				throw new EventoNaoEncontradoException("Evento não encontrado.");
			}
			// O merge entre nada e tudo é tudo. Ao tentar alterar um evento deletado ele será re-inserido
			// no banco de dados.
			em.merge(umEvento);
			tx.commit();
		}
		catch(RuntimeException e)
		{
			if (tx != null)
		    {   tx.rollback();
		    }
		    throw e;
		}
		finally
		{   em.close();
		}
	}

	public void exclui(long numero) throws EventoNaoEncontradoException
	{
		EntityManager em = null;
		EntityTransaction tx = null;

		try
		{
			em = FabricaDeEntityManager.criarEntityManager();
			tx = em.getTransaction();
			tx.begin();

			Evento evento = em.find(Evento.class, numero);

			if(evento == null)
			{	tx.rollback();
				throw new EventoNaoEncontradoException("Evento não encontrado");
			}

			em.remove(evento);
			tx.commit();
		}
		catch(RuntimeException e)
		{
			if (tx != null)
		    {   tx.rollback();
		    }
		    throw e;
		}
		finally
		{   em.close();
		}
	}

	public List<Evento> recuperaEventos()
	{
		EntityManager em = null;

		try
		{	em = FabricaDeEntityManager.criarEntityManager();

			List eventos = em
					.createQuery("select e from Evento e order by e.id")
					.getResultList();

			// Retorna um List vazio caso a tabela correspondente esteja vazia.

			return eventos;
		}
		finally
		{   em.close();
		}
	}
}