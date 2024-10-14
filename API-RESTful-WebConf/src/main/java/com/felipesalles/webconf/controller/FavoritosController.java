package com.felipesalles.webconf.controller;

import com.felipesalles.webconf.service.FavoritosService;
import com.felipesalles.webconf.model.Favoritos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("favoritos")
public class FavoritosController {

        @Autowired
        private FavoritosService favoritosService;

        @PostMapping
        public Favoritos criarFavoritos() {
            return favoritosService.criarFavoritos();
        }

        @DeleteMapping("{favoritoId}")
        public void deletarFavorito(@PathVariable("favoritoId") long favoritoId) {
            favoritosService.deletarFavorito(favoritoId);
        }
}
