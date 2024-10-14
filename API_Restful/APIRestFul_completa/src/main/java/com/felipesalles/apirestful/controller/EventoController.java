package com.felipesalles.apirestful.controller;

import com.felipesalles.apirestful.model.Evento;
import com.felipesalles.apirestful.model.ResultadoPaginado;
import com.felipesalles.apirestful.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @GetMapping   // http://localhost:8080/eventos
    public List<Evento> recuperarEventos() {
        return eventoService.recuperarEventos();
    }

    @PostMapping
    public Evento cadastrarEvento(@RequestBody Evento evento) {
        return eventoService.cadastrarEvento(evento);
    }

    @PutMapping
    public ResponseEntity<Evento> alterarEvento(@RequestBody Evento evento) {
        Evento umEvento = eventoService.alterarEvento(evento);
        return new ResponseEntity<Evento>(umEvento,HttpStatus.OK);
    }

    @DeleteMapping ("{idEvento}")     // http://localhost:8080/eventos/1
    public void removerEvento(@PathVariable("idEvento") Long id) {
        eventoService.removerEvento(id);
    }

    @GetMapping("categoriaEvento/{idCategoriaEvento}")             // http://localhost:8080/eventos/categoriaEvento/1
    public List<Evento> recuperarEventosPorIdDaCategoriaEvento(@PathVariable("idCategoriaEvento") Long idCategoriaEvento) {
        System.out.println(idCategoriaEvento);
        return eventoService.recuperarEventosPorIdDaCategoriaEventos(idCategoriaEvento);
    }

    @GetMapping("categoriasEvento")    // http://localhost:8080/eventos/categoriasEvento
    public List<Evento> recuperarEventosComCategoriaEvento() {
        return eventoService.recuperarEventosComCategoriaEventos();
    }

    // http://localhost:8080/eventos/paginacao?pagina=0&tamanho=5
    @GetMapping("paginacao")
    public ResultadoPaginado<Evento> recuperarEventosComPaginacao(
            @RequestParam(value = "pagina", defaultValue = "0") int pagina,
            @RequestParam(value = "tamanho", defaultValue = "3") int tamanho) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Evento> page = eventoService.recuperarEventosComPaginacao(pageable);
        ResultadoPaginado<Evento> resultadoPaginado = new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
        return resultadoPaginado;
    }
}
