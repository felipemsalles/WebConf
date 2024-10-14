package com.felipesalles.webconf.repository;


import com.felipesalles.webconf.model.ItemDeFavoritos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemDeFavoritosRepository extends JpaRepository<ItemDeFavoritos, Long>{

    ItemDeFavoritos findByEventoId(Long id);

    void deleteByEventoId(Long id);
}
