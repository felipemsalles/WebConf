package com.felipesalles.webconf.repository;

import com.felipesalles.webconf.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
