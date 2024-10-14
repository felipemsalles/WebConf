package com.felipesalles.webconf.controller;

import com.felipesalles.webconf.model.Evento;
import com.felipesalles.webconf.service.CategoriaService;
import com.felipesalles.webconf.service.EventoService;
import com.felipesalles.webconf.util.ResultadoPaginado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public List<Evento> recuperarEventos() {
        return eventoService.recuperarEventos();
    }

    @PostMapping
    public Evento cadastrarEvento(@RequestBody Evento evento) {
        System.out.println("Servidor recebeu a requisição.");
        categoriaService.recuperarCategoriaPorId(evento.getCategoria().getId());
        return eventoService.cadastrarEvento(evento);
    }

    @PutMapping
    public Evento alterarEvento(@RequestBody Evento evento) {
        return eventoService.alterarEvento(evento);
    }

    @DeleteMapping("{idEvento}")
    public Evento removerEvento(@PathVariable("idEvento") Long id) {
        Evento evento = eventoService.recuperarEventoPorId(id);
        eventoService.removerEvento(id);
        return evento;
    }

    @GetMapping("{idEvento}")
    public Evento recuperarEventoPorId(@PathVariable("idEvento") Long id) {
        return eventoService.recuperarEventoPorId(id);
    }

    @GetMapping("categoria/{idEvento}/{slug}")
    public List<Evento> recuperarEventoDeUmCategoriaPorId(@PathVariable("idEvento") Long id,
                                                     @PathVariable("slug") String slug) {
        return eventoService.recuperarEventoDeUmCategoriaPorId(id);
    }

    @GetMapping("categoria")
    public List<Evento> recuperarEventosPorIdCategoria(@RequestParam("idCategoria") Long id,
                                                  @RequestParam("slug") String slug) {
        return eventoService.recuperarEventosPorIdCategoria(id);
    }

    @GetMapping("categoria/{slugCategoria}")
    public List<Evento> recuperarEventosPorSlugDoCategoria(@PathVariable("slugCategoria") String slug) {
        return eventoService.recuperarEventosPorSlugDoCategoria(slug);
    }

    @GetMapping("categoria/paginacao")
    public ResultadoPaginado<Evento> recuperarEventosPorSlugDoCategoriaComPaginacao(
            @RequestParam(name="slugCategoria", defaultValue = "") String slug,
            @RequestParam(name="pagina", defaultValue = "0") int pagina,
            @RequestParam(name="tamanho", defaultValue = "3") int tamanho

    ) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Evento> paginaDeEvento = eventoService
                .recuperarEventosPorSlugDoCategoriaComPaginacao(slug, pageable);
        ResultadoPaginado<Evento> resultadoPaginado = new ResultadoPaginado<>(
                paginaDeEvento.getTotalElements(),
                paginaDeEvento.getTotalPages(),
                paginaDeEvento.getNumber(),
                paginaDeEvento.getContent());
        return resultadoPaginado;
    }
    @GetMapping("paginacao")
    public ResultadoPaginado<Evento> recuperarEventosPaginados(
            @RequestParam(name="pagina", defaultValue = "0") int pagina,
            @RequestParam(name="tamanho", defaultValue = "3") int tamanho,
            @RequestParam(name="nome", defaultValue = "") String nome
    ) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Evento> paginaDeEvento = eventoService.recuperarEventosPaginados(nome, pageable);
        ResultadoPaginado<Evento> resultadoPaginado = new ResultadoPaginado<>(
                paginaDeEvento.getTotalElements(),
                paginaDeEvento.getTotalPages(),
                paginaDeEvento.getNumber(),
                paginaDeEvento.getContent());
        return resultadoPaginado;
    }
}
