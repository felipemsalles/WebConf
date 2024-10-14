package com.felipesalles.webconf.controller;

import com.felipesalles.webconf.service.FavoritosService;
import com.felipesalles.webconf.model.ItemDeFavoritos;
import com.felipesalles.webconf.service.ItemDeFavoritosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("itemDeFavoritos")
public class ItemDeFavoritosController {

        @Autowired
        private ItemDeFavoritosService itemDeFavoritosService;

        @Autowired
        private FavoritosService favoritosService;

        @GetMapping
        public List<ItemDeFavoritos> recuperarItensDeFavoritos() {
            return itemDeFavoritosService.recuperarItensDeFavoritos();
        }

        @PostMapping
        public ItemDeFavoritos adicionarItemDeFavoritos(@RequestBody ItemDeFavoritos itemDeFavoritos) {
            System.out.println("Servidor recebeu a requisição.");
            favoritosService.recuperarFavoritosPorId(1L);
            return itemDeFavoritosService.adicionarItemDeFavoritos(itemDeFavoritos);
        }

        @PutMapping
        public ItemDeFavoritos alterarItemDeFavoritos(@RequestBody ItemDeFavoritos itemDeFavoritos) {
            return itemDeFavoritosService.alterarItemDeFavoritos(itemDeFavoritos);
        }

        @DeleteMapping("{idItemDeFavoritos}")
        public ItemDeFavoritos removerItemDeFavoritos(@PathVariable("idItemDeFavoritos") Long id) {
            ItemDeFavoritos itemDeFavoritos = itemDeFavoritosService.recuperarItemDeFavoritosPorId(id);
            itemDeFavoritosService.removerItemDeFavoritos(id);
            return itemDeFavoritos;
        }

        @DeleteMapping("evento/{idEvento}")
        public ItemDeFavoritos removerItemDeFavoritosPorEventoId(@PathVariable("idEvento") Long id) {
            ItemDeFavoritos itemDeFavoritos = itemDeFavoritosService.recuperarItemDeFavoritosPorEventoId(id);
            itemDeFavoritosService.removerItemDeFavoritosPorEventoId(id);
            return itemDeFavoritos;
        }

        @GetMapping("{idItemDeFavoritos}")
        public ItemDeFavoritos recuperarItemDeFavoritosPorId(@PathVariable("idItemDeFavoritos") Long id) {
            return itemDeFavoritosService.recuperarItemDeFavoritosPorId(id);
        }

        @GetMapping("evento/{idEvento}")
        public ItemDeFavoritos recuperarItemDeFavoritosPorEventoId(@PathVariable("idEvento") Long id) {
            return itemDeFavoritosService.recuperarItemDeFavoritosPorEventoId(id);
        }
}
