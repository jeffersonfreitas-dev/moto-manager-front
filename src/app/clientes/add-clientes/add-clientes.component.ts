import { Marca, Marcas } from 'src/app/marcas/marca';
import { Veiculo, VeiculoDTO, VeiculosDTO } from './../../veiculos/veiculos';
import { ModeloService } from './../../modelo/modelo.service';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from './../clientes.service';
import { Cliente, ClienteDTO } from './../cliente';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Modelo, ModeloDTO, Modelos } from 'src/app/modelo/modelo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from 'src/app/components/modal-delete/modal-delete.component';
import { MarcasService } from 'src/app/marcas/marcas.service';

@Component({
  selector: 'app-add-clientes',
  templateUrl: './add-clientes.component.html',
  styleUrls: ['./add-clientes.component.css'],
})
export class AddClientesComponent implements OnInit {
  cliente: Cliente = new Cliente();
  veiculo: Veiculo = new Veiculo();
  isErroAlert = false;
  isSuccessAlert = false;
  alertMensagem = '';
  loading: boolean = true;
  listModelos: Modelos = [];
  listMarcas: Marcas = [];
  modelo: Modelo = new Modelo();
  marca!: Marca;
  modeloEscolhido: string = '';

  sub: Subscription[] = [];

  constructor(
    private service: ClientesService,
    private modeloService: ModeloService,
    private marcaService: MarcasService,
    private modalService: NgbModal,
    private routeActive: ActivatedRoute
  ) {
    this.fillSelectModelos();
    this.fillSelectModelos();
    let uuid = this.routeActive.snapshot.paramMap.get('uuid');
    // if (uuid !== null) {
    this.getById(uuid);
    // }
  }

  ngOnInit(): void {}

  getById(uuid: string | null) {
    this.loading = true;
    if (uuid !== null) {
      this.sub.push(
        this.service.getById(uuid).subscribe(
          (data) => {
            this.cliente = data;
            this.fillSelectModelos();
            this.loading = false;
          },
          (error) => {
            this.loading = false;
            this.showError(error.error.message);
          }
        )
      );
    } else {
      this.fillSelectModelos();
    }
  }

  fillSelectModelos() {
    this.loading = true;
    this.sub.push(
      this.modeloService.getAll(1, 200).subscribe(
        (data) => {
          this.listModelos = data.content;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.showError(
            'Erro ao preencher o componente de modelos. Verifique sua conexão e tente novamente!'
          );
        }
      )
    );
  }

  fillSelectMarcas() {
    this.sub.push(
      this.marcaService.getAll(1, 200).subscribe(
        (data) => {
          this.listMarcas = data.content;
        },
        (error) => {
          'Erro ao preencher o componente de marcas. Verifique sua conexão e tente novamente!';
        }
      )
    );
  }

  salvar() {
    if (this.cliente.veiculos.length === 0) {
      this.showError(
        'O Cliente deve, obrigatoriamente, possuir um veiculo. Insira as informações e clique no botão "Incluir Veiculo"'
      );
    } else {
      this.loading = true;
      if (this.cliente.uuid !== '') {
        this.sub.push(
          this.service.update(this.cliente.uuid, this.cliente).subscribe(
            (data) => {
              this.showSuccess(data.nome);
              this.novo();
              this.loading = false;
            },
            (error) => {
              this.showError(error.error.message);
              this.loading = false;
            }
          )
        );
      } else {
        const dto = this.fromEntityToDto();
        this.sub.push(
          this.service.create(dto).subscribe(
            (data) => {
              this.showSuccess(data.nome);
              this.novo();
              this.loading = false;
            },
            (error) => {
              this.showError(error.error.message);
              this.loading = false;
            }
          )
        );
      }
    }
  }

  openDeleteVeiculoModal(nome: string, uuid: string, index: number) {
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.componentInstance.name = nome;
    modalRef.result.then((response) => {
      if (response) {
        this.excluirVeiculo(uuid, index);
      }
    });
  }

  novo() {
    this.cliente = new Cliente();
  }

  showError(error: string) {
    if (error === '' || error === undefined) {
      error = 'Erro ao tentar realizar a operação. Por favor, tente novamente.';
    }
    this.isErroAlert = true;
    this.isSuccessAlert = false;
    this.alertMensagem = error;
  }

  showSuccess(name: string) {
    this.isErroAlert = false;
    this.isSuccessAlert = true;
    this.alertMensagem = `Cliente "${name}" salvo com sucesso!`;
  }

  excluirVeiculo(uuid: string, index: number) {
    this.loading = true;
    if (uuid !== '') {
      this.sub.push(
        this.service.deleteVeiculoById(this.cliente.uuid, uuid).subscribe(
          (data) => {
            this.cliente.veiculos.splice(index, 1);
            this.loading = false;
            this.isErroAlert = false;
          },
          (error) => {
            this.showError(error.error.message);
            this.loading = false;
          }
        )
      );
    } else {
      this.cliente.veiculos.splice(index, 1);
      this.loading = false;
    }
  }

  verificaSeVeiculoFoiIncluido() {
    let result = false;
    for (let veiculo of this.cliente.veiculos) {
      if (this.veiculo.placa === veiculo.placa) {
        return true;
      }
    }
    return result;
  }

  incluirVeiculo() {
    if (
      this.veiculo.placa === '' ||
      this.veiculo.cor === '' ||
      this.veiculo.ano <= 0 ||
      this.veiculo.ano == null ||
      this.modeloEscolhido === ''
    ) {
      this.showError(
        'Todos os campos de veiculo são obrigatórios. Verifique se todos os dados foram preenchidos corretamente'
      );
    } else {
      if (!this.verificaSeVeiculoFoiIncluido()) {
        if (this.cliente.uuid !== '') {
          this.loading = true;
          const dto = this.fromVeiculoEntityToDTO(this.veiculo);
          this.sub.push(
            this.service.addVeiculo(this.cliente.uuid, dto).subscribe(
              (data) => {
                this.isErroAlert = false;
                this.loading = false;
                this.getById(this.cliente.uuid);
                this.fillSelectModelos();
              },
              (error) => {
                this.showError(error.error.message);
                this.loading = false;
              }
            )
          );
        } else {
          this.cliente.veiculos.push(this.veiculo);
        }
        this.novoVeiculo();
        this.isErroAlert = false;
      } else {
        this.showError(
          `Erro ao incluir o veiculo de placa ${this.veiculo.placa}. Veiculo já existente para este cliente!`
        );
      }
    }

    this.loading = false;
    this.fillSelectModelos();
  }

  novoVeiculo() {
    this.veiculo = new Veiculo();
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }

  onIncluirModelo() {
    const dto = new ModeloDTO();
    dto.ativo = this.modelo.ativo;
    dto.nome = this.modelo.nome;
    dto.marca = this.marca.uuid;
    console.log(dto)

    this.sub.push(
      this.modeloService.create(dto).subscribe(
        (data) => {
          this.veiculo.modelo = data;
          this.modeloService.getAll(1, 200).subscribe((data) => {
            this.listModelos = data.content;
            for (var m of this.listModelos) {
              if (m.nome === this.modelo.nome) {
                this.veiculo.modelo = m;
              }
            }
          });
        },
        (error) => {
          this.showError(error.error.message);
        }
      )
    );
  }

  onOpenModalCadastroModelo() {
    this.modelo = new Modelo();
    this.marca = new Marca();
    this.fillSelectMarcas();
    this.fillSelectMarcas();
  }

  fromEntityToDto() {
    const dto = new ClienteDTO();
    dto.ativo = this.cliente.ativo;
    dto.bairro = this.cliente.bairro;
    dto.celular = this.cliente.celular;
    dto.cep = this.cliente.cep;
    dto.cidade = this.cliente.cidade;
    dto.dataNascimento = this.cliente.dataNascimento;
    dto.email = this.cliente.email;
    dto.logradouro = this.cliente.logradouro;
    dto.nome = this.cliente.nome;
    dto.telefone = this.cliente.telefone;

    const veiculosDTO: VeiculosDTO = [];

    this.cliente.veiculos.forEach((v) => {
      veiculosDTO.push(this.fromVeiculoEntityToDTO(v));
    });
    dto.veiculos = veiculosDTO;
    return dto;
  }

  fromVeiculoEntityToDTO(veiculo: Veiculo) {
    const veiculoDto = new VeiculoDTO();
    veiculoDto.ano = veiculo.ano;
    veiculoDto.cliente = veiculo.cliente;
    veiculoDto.cor = veiculo.cor;
    veiculoDto.modelo = veiculo.modelo.uuid;
    veiculoDto.placa = veiculo.placa;
    return veiculoDto;
  }

  setarSeOpcaoNula(escolha: string) {
    if (escolha === '') {
      this.modeloEscolhido = '';
    } else {
      this.modeloEscolhido = escolha;
    }
  }
}
