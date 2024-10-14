package com.felipesalles.webconf.service;

import com.felipesalles.webconf.exception.EntidadeNaoEncontradaException;
import com.felipesalles.webconf.model.Categoria;
import com.felipesalles.webconf.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> recuperarCategorias() {
        return categoriaRepository.findAll(Sort.by("id"));
    }

    public Categoria recuperarCategoriaPorId(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Categoria número " + id + " não encontrado"));
    }
}
