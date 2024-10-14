package com.felipesalles.webconf.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Data
@NoArgsConstructor
@Entity
public class ItemDeFavoritos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int classificacao;

    @ManyToOne
    @JoinColumn(name = "evento_id")
    private Evento evento;

    @ManyToOne
    @JoinColumn(name = "favoritos_id")
    private Favoritos favoritos;

    public ItemDeFavoritos(int classificacao, Evento evento, Favoritos favoritos) {
        this.classificacao = classificacao;
        this.evento = evento;
        this.favoritos = favoritos;
    }
}
