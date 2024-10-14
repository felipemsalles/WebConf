package com.felipesalles.webconf.service;

import com.felipesalles.webconf.exception.EntidadeDestacadaException;
import com.felipesalles.webconf.exception.EntidadeNaoEncontradaException;
import com.felipesalles.webconf.exception.EntidadeTransienteException;
import com.felipesalles.webconf.model.ItemDeFavoritos;
import com.felipesalles.webconf.repository.ItemDeFavoritosRepository;
import org.springframework.data.domain.Sort;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class ItemDeFavoritosService {
    @Autowired
    private ItemDeFavoritosRepository itemDeFavoritosRepository;

    public List<ItemDeFavoritos> recuperarItensDeFavoritos() {
        return itemDeFavoritosRepository.findAll(Sort.by("id"));
    }

    public ItemDeFavoritos adicionarItemDeFavoritos(ItemDeFavoritos itemDeFavoritos) {
        if(itemDeFavoritos.getId() == null) {
            return itemDeFavoritosRepository.save(itemDeFavoritos);
        } else {
            throw new EntidadeDestacadaException("Tentando cadastrar um objeto destacado.");
        }
    }

    @Transactional
    public ItemDeFavoritos alterarItemDeFavoritos(ItemDeFavoritos itemDeFavoritos){
        if (itemDeFavoritos.getId() != null) {
            itemDeFavoritosRepository.findById(itemDeFavoritos.getId())
                    .orElseThrow(
                            () -> new EntidadeNaoEncontradaException("Item de favoritos não encontrado."));
            return itemDeFavoritosRepository.save(itemDeFavoritos);
        } else {
            throw new EntidadeTransienteException("Tentando alterar um objeto transiente.");
        }
    }

    public void removerItemDeFavoritos(Long id) {
        itemDeFavoritosRepository.deleteById(id);
    }

    public void removerItemDeFavoritosPorEventoId(Long id) {
        itemDeFavoritosRepository.deleteByEventoId(id);
    }

    @GetMapping
    public ItemDeFavoritos recuperarItemDeFavoritosPorId(Long id) {
        return itemDeFavoritosRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Item de favoritos número " + id + " não encontrado."));
    }

    @GetMapping
    public ItemDeFavoritos recuperarItemDeFavoritosPorEventoId(Long id) {
        return itemDeFavoritosRepository.findByEventoId(id);
    }
}
