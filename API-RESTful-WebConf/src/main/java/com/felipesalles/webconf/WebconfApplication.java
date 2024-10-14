package com.felipesalles.webconf;

import com.felipesalles.webconf.repository.EventoRepository;
import com.felipesalles.webconf.repository.FavoritosRepository;
import com.felipesalles.webconf.repository.CategoriaRepository;
import com.felipesalles.webconf.repository.ItemDeFavoritosRepository;
import com.felipesalles.webconf.model.Categoria;
import com.felipesalles.webconf.model.Evento;
import com.felipesalles.webconf.model.Favoritos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.LocalDate;

@SpringBootApplication
public class WebconfApplication implements CommandLineRunner{

	@Autowired
	private EventoRepository eventoRepository;

	@Autowired
	private CategoriaRepository categoriaRepository;

	@Autowired
	private FavoritosRepository favoritoRepository;

	@Autowired
	private ItemDeFavoritosRepository itemDeFavoritosRepository;

	public static void main(String[] args) {
		SpringApplication.run(WebconfApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/categorias").allowedOrigins("http://localhost:5173");
				registry.addMapping("/eventos").allowedOrigins("http://localhost:5173");
				registry.addMapping("/favoritos").allowedOrigins("http://localhost:5173");
				registry.addMapping("/itemDeFavoritos").allowedOrigins("http://localhost:5173");
			}
		};
	}

	@Override
	public void run(String... args) throws Exception {
		Favoritos favoritos = new Favoritos(LocalDate.now());
		favoritoRepository.save(favoritos);

		Categoria congresso = new Categoria("Congresso", "congresso");
		categoriaRepository.save(congresso);
		Categoria minicurso = new Categoria("Minicurso", "minicurso");
		categoriaRepository.save(minicurso);
		Categoria hackathon = new Categoria("Hackathon", "hackathon");
		categoriaRepository.save(hackathon);

		Evento evento = new Evento(
				"Simpósio Brasileiro em Segurança da Informação e de Sistemas Computacionais(SBSeg)",
				"O Simpósio Brasileiro em Segurança da Informação e de Sistemas Computacionais (SBSeg) é um evento científico realizado anualmente pela Sociedade Brasileira de Computação (SBC) sob responsabilidade da Comissão Especial em Segurança da Informação e de Sistemas Computacionais (CESeg) da SBC.",
				"https://sbseg2024.ita.br/wp-content/uploads/2024/03/logo-sbc.png",
				"SBC",
				"Diego Kreutz",
				congresso,
				"Em Andamento",
				24,
				LocalDate.of(2023, 11, 3),
				LocalDate.now());
		eventoRepository.save(evento);

		evento = new Evento(
				"Desenvolvimento ágil de software Seguro e a cultura DevSecOps",
				"Neste minicurso intensivo, exploraremos os fundamentos e práticas avançadas do Desenvolvimento Ágil de Software Seguro, integrando a cultura DevSecOps. Em um ambiente onde a segurança é crítica e as demandas por entregas rápidas são constantes, este curso te guiará para um pleno aprendizado.",
				"https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~COURSE!~principios-de-desenvolvimento-agil-de-software/XDP~COURSE!~principios-de-desenvolvimento-agil-de-software.jpeg",
				"SBC",
				"Altair Santin",
				minicurso,
				"Concluído",
				37,
				LocalDate.of(2019, 1, 12),
				LocalDate.of(2022, 6, 24));
		eventoRepository.save(evento);

		evento = new Evento(
				"Uma abordagem prática voltada a aplicações de Interface Cérebro-Computador utilizando sinais de EEG",
				"Este minicurso apresenta o processamento de sinais de Eletro-Encefalografia (EEG) com foco no desenvolvimento de aplicações de Interface Cérebro-Computador (Brain-Computer Interface, BCI). O objetivo é estimular o interesse sobre o assunto, e induzir o surgimento de novos pesquisadores para atuar na área.",
				"https://static.wixstatic.com/media/521092_2409525cc6dc4502ab84563e31a2232b~mv2.png/v1/fill/w_168,h_85,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/521092_2409525cc6dc4502ab84563e31a2232b~mv2.png",
				"SBC",
				"Sérgio Teixeira",
				minicurso,
				"Concluído",
				23,
				LocalDate.of(2014, 10, 9),
				LocalDate.of(2015, 3, 19));
		eventoRepository.save(evento);

		evento = new Evento(
				"Congresso Brasileiro de Sistemas Inteligentes",
				"O BRACIS é um evento anual da Sociedade Brasileira de Computação (SBC), e é apoiado pelos grupos de interesse especial em Inteligência Artificial (CEIA) e Inteligência Computacional (CEIC), e este ano está sendo organizado pelo CIIA-Health. O evento promove tanto aspectos teóricos quanto aplicações de Inteligência Artificial e Computacional, bem como incentiva a troca de ideias científicas entre pesquisadores, profissionais, cientistas e indústria.",
				"https://bracis.sbc.org.br/2024/wp-content/uploads/2024/05/logo-bracisarvoresbc2.png",
				"SBC",
				"Gisele Pappa",
				congresso,
				"Em Andamento",
				10,
				LocalDate.of(2022, 10, 20),
				LocalDate.now());
		eventoRepository.save(evento);

		evento = new Evento(
				"Hackathon SBGF",
				"A Sociedade Brasileira de Geofísica vai selecionar 5 equipes de graduação e 5 equipes de pós-graduação para participação no desafio Hackathon, proposto em conjunto pela organização do Congresso e pela empresa Halliburton. A empresa fornecerá o ambiente de acesso e tratamento dos dados, utilizando recursos de nuvem, assim como as facilidades para criação de modelos de aprendizado de máquina ou recursos de inteligência artificial (IA).",
				"https://sbgf.org.br/congresso/assets/images/banner.png",
				"SBC",
				"Gisele Pappa",
				hackathon,
				"Em Andamento",
				27,
				LocalDate.of(2023, 1, 11),
				LocalDate.now());
		eventoRepository.save(evento);
	}

}
