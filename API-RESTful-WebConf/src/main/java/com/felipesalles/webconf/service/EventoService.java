package com.felipesalles.webconf.service;

import com.felipesalles.webconf.exception.EntidadeDestacadaException;
import com.felipesalles.webconf.exception.EntidadeNaoEncontradaException;
import com.felipesalles.webconf.exception.EntidadeTransienteException;
import com.felipesalles.webconf.repository.EventoRepository;
import com.felipesalles.webconf.model.Evento;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    public List<Evento> recuperarEventos() {
        return eventoRepository.recuperarEventosComCategoria();
    }

    public Evento cadastrarEvento(Evento evento) {
        if(evento.getId() == null) {
            return eventoRepository.save(evento);
        } else {
            throw new EntidadeDestacadaException("Tendando cadastrar um objeto destacado.");
        }
    }

    @Transactional
    public Evento alterarEvento(Evento evento) {
        if(evento.getId() != null) {
            eventoRepository.findById(evento.getId())
                    .orElseThrow(
                            () -> new EntidadeNaoEncontradaException("Evento não encontrado."));
            return eventoRepository.save(evento);
        } else {
            throw new EntidadeTransienteException("Tendando alterar um objeto transiente.");
        }
    }

    public void removerEvento(Long id) {
        eventoRepository.deleteById(id);
    }

    @GetMapping
    public Evento recuperarEventoPorId(Long id) {
        return eventoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Evento número " + id + " não encontrado."));
    }

    public List<Evento> recuperarEventoDeUmCategoriaPorId(Long id){
        return eventoRepository.findByCategoriaId(id);
    }

    public List<Evento> recuperarEventosPorIdCategoria(Long id){
        return eventoRepository.findByCategoriaId(id);
    }

    public List<Evento> recuperarEventosPorSlugDoCategoria(String slug) {
        return eventoRepository.findByCategoriaSlug(slug);
    }

    public Page<Evento> recuperarEventosPorSlugDoCategoriaComPaginacao(String slug, Pageable pageable) {
        if (!slug.isEmpty())
            return eventoRepository.recuperarEventosPorSlugDoCategoriaComPaginacao(slug, pageable);
        else
            return eventoRepository.recuperarEventosComPaginacao(pageable);
    }

    public Page<Evento> recuperarEventosPaginados(String nome, Pageable pageable) {
        return eventoRepository.recuperarEventosPaginados(nome, pageable);
    }
}
