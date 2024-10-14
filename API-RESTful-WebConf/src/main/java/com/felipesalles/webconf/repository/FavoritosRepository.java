package com.felipesalles.webconf.repository;

import com.felipesalles.webconf.model.Favoritos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoritosRepository extends JpaRepository<Favoritos, Long> {
    Favoritos findById(long id);
    void deleteById(long id);
}

