package com.felipesalles.apirestful.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class CategoriaEvento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @JsonIgnore
    @OneToMany (mappedBy = "categoriaEvento")
    private List<Evento> eventos;

    public CategoriaEvento(String nome) {
        this.nome = nome;
        this.eventos = new ArrayList<>();
    }
}
