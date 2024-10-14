package com.felipesalles;

import com.felipesalles.dao.EventoDAO;
import com.felipesalles.excecao.EventoNaoEncontradoException;
import com.felipesalles.modelo.Evento;
import com.felipesalles.util.FabricaDeDAOs;
import com.felipesalles.util.Util;
import corejava.Console;

import java.time.LocalDate;
import java.util.List;

public class Principal
{	public static void main (String[] args) 
	{
//		Logger logger = LoggerFactory.getLogger(Principal.class);
//		logger.error("Mensagem de log emitida utilizando o LOG4J");
		// fatal - error - warning - info - debug

		String nome;
		String dataEvento;
		String dataCadastro;
		Evento umEvento;

		EventoDAO eventoDAO = FabricaDeDAOs.getDAO(EventoDAO.class);

		boolean continua = true;
		while (continua)
		{	System.out.println('\n' + "O que você deseja fazer?");
			System.out.println('\n' + "1. Cadastrar um evento");
			System.out.println("2. Alterar um evento");
			System.out.println("3. Remover um evento");
			System.out.println("4. Listar todos os eventos");
			System.out.println("5. Sair");
						
			int opcao = Console.readInt('\n' + 
							"Digite um número entre 1 e 5:");
					
			switch (opcao)
			{	case 1:
				{
					nome = Console.readLine('\n' + 
						"Informe o nome do evento: ");
					dataEvento = Console.readLine(
						"Informe a data do evento: ");
					dataCadastro = Console.readLine(
						"Informe a data de cadastramento do evento no sistema: ");
						
					umEvento = new Evento(nome, Util.strToLocalDate(dataEvento), Util.strToLocalDate(dataCadastro));
					
					eventoDAO.inclui(umEvento);
					
					System.out.println('\n' + "Evento número " +
					    umEvento.getId() + " incluído com sucesso!");

					break;
				}

				case 2:
				{	int resposta = Console.readInt('\n' + 
						"Digite o número do evento que você deseja alterar: ");
										
					try
					{
						umEvento = eventoDAO.recuperaUmEvento(resposta);
					}
					catch(EventoNaoEncontradoException e)
					{	System.out.println('\n' + e.getMessage());
						break;
					}
										
					System.out.println('\n' + 
						"Número = " + umEvento.getId() +
						"    Nome = " + umEvento.getNome() +
						"    DataEvento = " + umEvento.getDataEvento());
												
					System.out.println('\n' + "O que você deseja alterar?");
					System.out.println('\n' + "1. Nome");
					System.out.println("2. Data Evento");

					int opcaoAlteracao = Console.readInt('\n' + 
											"Digite um número de 1 a 2:");

					switch (opcaoAlteracao)
					{	case 1:
							String novoNome = Console.
								readLine("Digite o novo nome: ");

							umEvento.setNome(novoNome);

							try
							{
								eventoDAO.altera(umEvento);

								System.out.println('\n' +
									"Alteração de nome efetuada com sucesso!");
							}
							catch(EventoNaoEncontradoException e)
							{	System.out.println('\n' + e.getMessage());
							}

							break;

						case 2:
							LocalDate novoDataEvento = LocalDate.parse(Console.
									readLine("Digite a nova data do evento: "));

							umEvento.setDataEvento(novoDataEvento);

							try
							{
								eventoDAO.altera(umEvento);

								System.out.println('\n' +
									"Alteração de data evento efetuada " +
									"com sucesso!");
							}
							catch(EventoNaoEncontradoException e)
							{	System.out.println('\n' + e.getMessage());
							}

							break;

						default:
							System.out.println('\n' + "Opção inválida!");
					}

					break;
				}

				case 3:
				{	int resposta = Console.readInt('\n' + 
						"Digite o número do evento que você deseja remover: ");
									
					try
					{
						umEvento = eventoDAO.recuperaUmEvento(resposta);
					}
					catch(EventoNaoEncontradoException e)
					{	System.out.println('\n' + e.getMessage());
						break;
					}
										
					System.out.println('\n' + 
						"Número = " + umEvento.getId() +
						"    Nome = " + umEvento.getNome());
														
					String resp = Console.readLine('\n' + 
						"Confirma a remoção do evento?");

					if(resp.equals("s"))
					{	try
						{
							eventoDAO.exclui (umEvento.getId());
							System.out.println('\n' + 
								"Evento removido com sucesso!");
						}
						catch(EventoNaoEncontradoException e)
						{	System.out.println('\n' + e.getMessage());
						}
					}
					else
					{	System.out.println('\n' + "Evento não removido.");
					}
					
					break;
				}

				case 4:
				{
					List<Evento> eventos = eventoDAO.recuperaEventos();

//                  Utilizando um consumer. Consumer é uma interface funcional. Ela recebe um
//                  argumento e não retorna nada. Para que um valor seja aceito pelo Consumer
//                  deve ser executado o método accept.


//                  Utilizando method reference. Method references são expressões que possuem
//                  o mesmo tratamento de expressões lambda, mas em vez de prover um corpo  à
//                  expressão lambda, eles (os method references) referenciam um método existente
//                  pelo nome.

					for (Evento evento : eventos)
					{
						System.out.println('\n' +
							"Id = " + evento.getId() +
							"  Nome = " + evento.getNome() +
							"  Data Evento = " + Util.dateToStr(evento.getDataEvento()) +
							"  Data Cadastro = " + Util.dateToStr(evento.getDataCadastro()));
					}

					break;
				}

				case 5:
				{	continua = false;
					break;
				}

				default:
					System.out.println('\n' + "Opção inválida!");
			}
		}		
	}
}
