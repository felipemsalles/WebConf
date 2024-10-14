package com.felipesalles.apirestful.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;

@ToString
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String imagem;
    private String nome;
    private String descricao;
    private boolean disponivel;
    private BigDecimal preco;
    private LocalDate dataCadastro;
    @ManyToOne
    private CategoriaEvento categoriaEvento;

    public Evento(String imagem,
                   String nome,
                   String descricao,
                   boolean disponivel,
                   BigDecimal preco,
                   LocalDate dataCadastro,
                   CategoriaEvento categoriaEvento) {
        this.imagem = imagem;
        this.nome = nome;
        this.descricao = descricao;
        this.disponivel = disponivel;
        this.preco = preco;
        this.dataCadastro = dataCadastro;
        this.categoriaEvento = categoriaEvento;
    }
}
