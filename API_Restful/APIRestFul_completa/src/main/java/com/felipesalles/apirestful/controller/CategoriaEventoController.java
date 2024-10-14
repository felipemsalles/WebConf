package com.felipesalles.apirestful.controller;

import com.felipesalles.apirestful.exception.EntidadeNaoEncontradaException;
import com.felipesalles.apirestful.model.CategoriaEvento;
import com.felipesalles.apirestful.model.CategoriaEventoDTO;
import com.felipesalles.apirestful.service.CategoriaEventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("categoriasEvento")
public class CategoriaEventoController {

    @Autowired
    private CategoriaEventoService categoriaEventoService;

    @GetMapping("{idCategoriaEvento}")
    public CategoriaEvento recuperarCategoriaEvento(@PathVariable("idCategoriaEvento") Long idCategoriaEvento) {
        return categoriaEventoService.recuperarCategoriaEvento(idCategoriaEvento)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "CategoriaEvento número " + idCategoriaEvento + " não encontrada"));
    }

    @GetMapping("{idCategoriaEvento}/eventos")          // http://localhost:8080/categoriasEvento/1/eventos
    public CategoriaEventoDTO recuperarCategoriaEventoComEventos(@PathVariable("idCategoriaEvento") Long idCategoriaEvento) {
        CategoriaEvento categoriaEvento = categoriaEventoService.recuperarCategoriaEventoComEventos(idCategoriaEvento);
        return new CategoriaEventoDTO(categoriaEvento.getId(), categoriaEvento.getNome(), categoriaEvento.getEventos());
    }
}
