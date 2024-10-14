package com.felipesalles.webconf.controller;

import com.felipesalles.webconf.model.Categoria;
import com.felipesalles.webconf.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public List<Categoria> recuperarCategorias() {
        return categoriaService.recuperarCategorias();
    }
}
