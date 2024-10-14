package com.felipesalles.apirestful.service;

import com.felipesalles.apirestful.exception.EntidadeNaoEncontradaException;
import com.felipesalles.apirestful.model.CategoriaEvento;
import com.felipesalles.apirestful.repository.CategoriaEventoRepository;
import com.felipesalles.apirestful.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoriaEventoService {

    @Autowired
    private CategoriaEventoRepository categoriaEventoRepository;
    @Autowired
    private EventoRepository eventoRepository;

    public Optional<CategoriaEvento> recuperarCategoriaEvento(Long idCategoriaEvento) {
        return categoriaEventoRepository.findById(idCategoriaEvento);
    }

    public CategoriaEvento recuperarCategoriaEventoComEventos(Long idCategoriaEvento) {
        return categoriaEventoRepository.recuperarCategoriaEventoComEventosPorIdDaCategoriaEvento(idCategoriaEvento)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "CategoriaEvento número " + idCategoriaEvento + " não encontrada"));
    }
}
