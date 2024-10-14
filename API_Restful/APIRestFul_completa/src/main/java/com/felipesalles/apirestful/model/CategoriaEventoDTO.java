package com.felipesalles.apirestful.model;

import java.util.List;

public record CategoriaEventoDTO(Long id, String nome, List<Evento> lista) {

}
