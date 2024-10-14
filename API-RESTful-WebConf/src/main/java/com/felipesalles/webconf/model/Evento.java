package com.felipesalles.webconf.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "O nome do evento deve ser informado.")
    private String nome;

    @Lob
    @NotEmpty(message = "A descrição do evento deve ser informada.")
    @Column(length = 5000)
    private String descricao;

    @Lob
    @NotEmpty(message = "A imagem do Evento deve ser informada.")
    @Column(length = 5000)
    private String imagem;

    @NotEmpty(message = "A organização do Evento deve ser informada.")
    private String organizacao;

    @NotEmpty(message = "O coordenador do Evento deve ser informado.")
    private String coordenador;

    @ManyToOne
    private Categoria categoria;

    @NotEmpty(message = "O status do evento deve ser informado.")
    private String status;

    @Min(value = 1, message = "A quantidade de edições deve ser informada.")
    private int qtdEdicoes;

    @NotNull(message = "A data do evento deve ser informada.")
    @Column(name = "Data_Evento")
    private LocalDate dataEvento;

    @NotNull(message = "A data de encerramento deve ser informada.")
    @Column(name = "Data_Encerramento")
    private LocalDate dataEncerramento;

    public Evento(
            String nome,
            String descricao,
            String imagem,
            String organizacao,
            String coordenador,
            Categoria categoria,
            String status,
            int qtdEdicoes,
            LocalDate dataEvento,
            LocalDate dataEncerramento
    ) {
        this.nome = nome;
        this.descricao = descricao;
        this.imagem = imagem;
        this.organizacao = organizacao;
        this.coordenador = coordenador;
        this.categoria = categoria;
        this.status = status;
        this.qtdEdicoes = qtdEdicoes;
        this.dataEvento = dataEvento;
        this.dataEncerramento = dataEncerramento;
    }
}