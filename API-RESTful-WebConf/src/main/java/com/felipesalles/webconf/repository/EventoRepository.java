package com.felipesalles.webconf.repository;

import com.felipesalles.webconf.model.Evento;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EventoRepository extends JpaRepository<Evento, Long> {

    @Query("select a from Evento a left outer join fetch a.categoria order by a.id")
    List<Evento> recuperarEventosComCategoria();

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select a from Evento a left outer join fetch a.categoria where a.id = :id")
    Optional<Evento> recuperarEventoPorIdComLock(Long id);

    List<Evento> findByCategoriaId(Long id);

    @Query("select a from Evento a left outer join fetch a.categoria g where g.slug = :slug order by a.id desc")
    List<Evento> findByCategoriaSlug(String slug);

    @Query(
            value = "select a from Evento a left join fetch a.categoria where a.nome like %:nome% order by a.id desc",
            countQuery = "select count(a) from Evento a where a.nome like %:nome%"
    )
    Page<Evento> recuperarEventosPaginados(String nome, Pageable pageable);

    @Query(
            value = "select a from Evento a left join fetch a.categoria g where g.slug = :slug order by a.nome asc",
            countQuery = "select count(a) from Evento a left join a.categoria g where g.slug = :slug"
    )
    Page<Evento> recuperarEventosPorSlugDoCategoriaComPaginacao(String slug, Pageable pageable);

    @Query(
            value = "select a from Evento a left join fetch a.categoria order by a.nome asc",
            countQuery = "select count(a) from Evento a"
    )
    Page<Evento> recuperarEventosComPaginacao(Pageable pageable);
}
