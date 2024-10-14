package com.felipesalles.apirestful.service;

import com.felipesalles.apirestful.exception.EntidadeDestacadaException;
import com.felipesalles.apirestful.exception.EntidadeNaoEncontradaException;
import com.felipesalles.apirestful.exception.EntidadeTransienteException;
import com.felipesalles.apirestful.model.Evento;
import com.felipesalles.apirestful.repository.EventoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    public List<Evento> recuperarEventos() {
        return eventoRepository.recuperarEventosComCategoriaEvento();
    }

    public Evento cadastrarEvento(Evento evento) {
        if (evento.getId() == null) {
            return eventoRepository.save(evento);
        }
        else {
            throw new EntidadeDestacadaException(
                "Tentando cadastrar um objeto destacado.");
        }
    }

//    public Produto alterarProduto(Produto produto) {
//        if (produto.getId() == null) {
//            throw new EntidadeTransienteException("Tentando alterar um objeto transiente.");
//        }
//        else {
//            if (produtoRepository.findById(produto.getId()).isPresent()) {
//                return produtoRepository.save(produto);
//            }
//            else {
//                throw new EntidadeNaoEncontradaException(
//                        "Produto número " + produto.getId() + " não encontrado.");
//            }
//        }
//    }

    @Transactional
    public Evento alterarEvento(Evento evento) {
        if (evento.getId() == null) {
            throw new EntidadeTransienteException("Tentando alterar um objeto transiente.");
        }
        else {
            eventoRepository.recuperarPorIdComLock(evento.getId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                      "Evento número " + evento.getId() + " não encontrado."));
            return eventoRepository.save(evento);
        }
    }

    public void removerEvento(Long id) {
        Evento e = eventoRepository.findById(id)
            .orElseThrow(() -> new EntidadeNaoEncontradaException(
                "Evento número " + id + " não encontrado."));
        eventoRepository.delete(e);
    }

    public List<Evento> recuperarEventosPorIdDaCategoriaEventos(Long idCategoriaEvento) {
        return eventoRepository.findByCategoriaEventoId(idCategoriaEvento);
    }

    public List<Evento> recuperarEventosComCategoriaEventos() {
        // return eventoRepository.findAll();
        return eventoRepository.recuperarEventosComCategoriaEvento();
    }

    public Page<Evento> recuperarEventosComPaginacao(Pageable pageable) {
        return eventoRepository.recuperarEventosComPaginacao(pageable);
    }
}
