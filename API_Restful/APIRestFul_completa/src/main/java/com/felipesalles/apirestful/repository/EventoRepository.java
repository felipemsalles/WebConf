package com.felipesalles.apirestful.repository;

import com.felipesalles.apirestful.model.Evento;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EventoRepository extends JpaRepository<Evento, Long> {

    List<Evento> findByCategoriaEventoId(Long idCategoriaEvento);

    @Query("select e from Evento e " +
           "left outer join fetch e.categoriaEvento " +
           "order by e.id")
    List<Evento> recuperarEventosComCategoriaEvento();

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select e from Evento e where e.id = :id")
    Optional<Evento> recuperarPorIdComLock(Long id);

    @Query(
            value = "select e from Evento e " +
                    "left outer join fetch e.categoriaEvento " +
                    "order by e.id",
            countQuery = "select count(e) from Evento e"
    )
    Page<Evento> recuperarEventosComPaginacao(Pageable pageable);
}
