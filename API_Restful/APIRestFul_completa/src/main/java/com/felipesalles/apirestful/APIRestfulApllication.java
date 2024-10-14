package com.felipesalles.apirestful;

import com.felipesalles.apirestful.model.CategoriaEvento;
import com.felipesalles.apirestful.model.Evento;
import com.felipesalles.apirestful.repository.CategoriaEventoRepository;
import com.felipesalles.apirestful.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigDecimal;
import java.time.LocalDate;

@SpringBootApplication
public class APIRestfulApllication implements CommandLineRunner {

	@Autowired
	private CategoriaEventoRepository categoriaEventoRepository;

	@Autowired
	private EventoRepository eventoRepository;

	public static void main(String[] args) {
		SpringApplication.run(APIRestfulApllication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		CategoriaEvento workshop = new CategoriaEvento("Workshop");
		categoriaEventoRepository.save(workshop);

		CategoriaEvento palestra = new CategoriaEvento("Palestra");
		categoriaEventoRepository.save(palestra);

		CategoriaEvento congresso = new CategoriaEvento("Congresso");
		categoriaEventoRepository.save(congresso);

		Evento evento1 = new Evento(
				"congresso-sbrc.png",
				"Congresso de Redes",
				"Um excelente congresso de Redes.",
				true,
				BigDecimal.valueOf(50.00),
				LocalDate.of(2023, 4, 26),
				congresso);
		eventoRepository.save(evento1);

		Evento evento2 = new Evento(
				"congresso-sbcas.png",
				"Congresso de Saúde",
				"Um excelente congresso de Saúde.",
				true,
				BigDecimal.valueOf(50.00),
				LocalDate.of(2023, 6, 20),
				congresso);
		eventoRepository.save(evento2);

		Evento evento3 = new Evento(
				"palestra-machine-learning.jpg",
				"Palestra: Introdução ao Machine Learning",
				"Uma palestra sobre ML",
				true,
				BigDecimal.valueOf(0.00),
				LocalDate.of(2023, 5, 22),
				palestra);
		eventoRepository.save(evento3);

		Evento evento4 = new Evento(
				"tutorial-python.png",
				"Tutorial: Python para Ciência de Dados",
				"Um tutorial prático sobre como usar Python para análise de dados e machine learning.",
				true,
				BigDecimal.valueOf(30.00),
				LocalDate.of(2024, 6, 25),
				workshop);
		eventoRepository.save(evento4);

		Evento evento5 = new Evento(
				"palestra-seguranca-cibernetica.jpg",
				"Palestra: Desafios atuais em Segurança Cibernética",
				"Uma palestra sobre os desafios de segurança cibernética enfrentados hoje e como abordá-los.",
				true,
				BigDecimal.valueOf(20.00),
				LocalDate.of(2024, 7, 30),
				palestra);
		eventoRepository.save(evento5);

		Evento evento6 = new Evento(
				"palestra-saude-digital.jpg",
				"Palestra: Desafios atuais em Saúde Digital",
				"Uma palestra sobre os desafios de saúde digital enfrentados hoje e como abordá-los.",
				true,
				BigDecimal.valueOf(25.00),
				LocalDate.of(2024, 8, 30),
				workshop);
		eventoRepository.save(evento6);

		Evento evento7 = new Evento(
				"tutorial-git-github.png",
				"Tutorial: Git e GitHub para Desenvolvedores",
				"Um tutorial abrangente sobre como usar o Git e o GitHub para controle de versão e colaboração em projetos de software.",
				true,
				BigDecimal.valueOf(25.00),
				LocalDate.of(2024, 7, 15),
				workshop);
		eventoRepository.save(evento7);

		Evento evento8 = new Evento(
				"palestra-inteligencia-artificial.jpg",
				"Palestra: Inteligência Artificial e seu Impacto na Sociedade",
				"Uma palestra discutindo o impacto da inteligência artificial em diferentes aspectos da sociedade.",
				true,
				BigDecimal.valueOf(15.00),
				LocalDate.of(2024, 9, 10),
				palestra);
		eventoRepository.save(evento8);
	}
}
