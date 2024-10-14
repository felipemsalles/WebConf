package com.felipesalles.webconf.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@Getter
@ToString
public class ResultadoPaginado<T> {
    private long totalDeItens;
    private int totalDePaginas;
    private int paginaCorrente;
    private List<T> itens;
}
