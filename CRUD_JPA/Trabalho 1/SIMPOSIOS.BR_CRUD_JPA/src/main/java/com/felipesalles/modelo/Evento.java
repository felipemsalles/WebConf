package com.felipesalles.modelo;

import net.bytebuddy.asm.Advice;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
// @Table(name="evento")

public class Evento
{

    private Long id;
    private String nome;
    private LocalDate dataEvento;
    private LocalDate dataCadastro;


    // ********* Construtores *********

    public Evento()
    {
    }

    public Evento(String nome,
                   LocalDate dataEvento,
                   LocalDate dataCadastro)
    {	this.nome = nome;
        this.dataEvento = dataEvento;
        this.dataCadastro = dataCadastro;
    }

    // ********* Métodos do Tipo Get *********

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    public Long getId()
    {	return id;
    }

    public String getNome()
    {	return nome;
    }

    @Column(name="DATA_EVENTO")
    public LocalDate getDataEvento()
    {	return dataEvento;
    }

    @Column(name="DATA_CADASTRO")
    public LocalDate getDataCadastro()
    {	return dataCadastro;
    }


    // ********* Métodos do Tipo Set *********

    private void setId(Long id)
    {	this.id = id;
    }

    public void setNome(String nome)
    {	this.nome = nome;
    }

    public void setDataEvento(LocalDate dataEvento)
    {	this.dataEvento = dataEvento;
    }

    public void setDataCadastro(LocalDate dataCadastro)
    {	this.dataCadastro = dataCadastro;
    }

}


