package com.felipesalles.webconf.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(value = {"eventos"})
@Data
@NoArgsConstructor
@Entity
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String slug;

    @OneToMany(mappedBy = "categoria")
    private List<Evento> eventos;

    public Categoria(String nome, String slug) {
        this.nome = nome;
        this.slug = slug;
        this.eventos = new ArrayList<>();
    }
}
