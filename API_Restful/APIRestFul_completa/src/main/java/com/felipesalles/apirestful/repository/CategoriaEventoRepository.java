package com.felipesalles.apirestful.repository;

import com.felipesalles.apirestful.model.CategoriaEvento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CategoriaEventoRepository extends JpaRepository<CategoriaEvento, Long> {

    @Query("select c from CategoriaEvento c left outer join fetch c.eventos where c.id = 1")
    Optional<CategoriaEvento> recuperarCategoriaEventoComEventosPorIdDaCategoriaEvento(long id);
}
