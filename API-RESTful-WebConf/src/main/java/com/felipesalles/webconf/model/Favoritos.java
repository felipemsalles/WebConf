package com.felipesalles.webconf.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class Favoritos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_criacao")
    private LocalDate dataCriacao;

    @JsonIgnore
    @OneToMany(mappedBy = "favoritos")
    private List<ItemDeFavoritos> itensDeFavoritos;

    public Favoritos(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
        this.itensDeFavoritos = new ArrayList<>();
    }
}
