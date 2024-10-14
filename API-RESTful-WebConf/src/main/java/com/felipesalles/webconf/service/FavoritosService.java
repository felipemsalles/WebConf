package com.felipesalles.webconf.service;

import com.felipesalles.webconf.exception.EntidadeNaoEncontradaException;
import com.felipesalles.webconf.model.Favoritos;
import com.felipesalles.webconf.repository.FavoritosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
@Service
public class FavoritosService {

    @Autowired
    private FavoritosRepository favoritosRepository;

    public Favoritos criarFavoritos() {
        Favoritos favorito = new Favoritos();
        favorito.setDataCriacao(LocalDate.now());

        return favoritosRepository.save(favorito);
    }

    public void deletarFavorito(long favoritoId) {
        favoritosRepository.deleteById(favoritoId);
    }

    public Favoritos recuperarFavoritosPorId(Long id) {
        return favoritosRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Favorito número " + id + " não encontrado"));
    }
}
