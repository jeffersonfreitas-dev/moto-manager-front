import { Marca, Marcas } from './../../marcas/marca';
import { Modelo, ModeloDTO } from './../modelo';
import { Component, OnInit } from '@angular/core';
import { MarcasService } from 'src/app/marcas/marcas.service';
import { ModeloService } from '../modelo.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-modelos',
  templateUrl: './add-modelos.component.html',
})
export class AddModelosComponent implements OnInit {
  modelo = new Modelo();
  listMarcas: Marcas = [];
  marca: Marca = new Marca();
  nomemarca: string = '';

  isSuccessAlert = false;
  isErroAlert = false;
  alertMensagem = '';
  loading: boolean = true;

  sub: Subscription[] = [];

  constructor(
    private service: ModeloService,
    private marcaService: MarcasService,
    private routeActive: ActivatedRoute
  ) {
    this.fillSelectMarcas();
    this.fillSelectMarcas();
    let uuid = this.routeActive.snapshot.paramMap.get('uuid');
    this.getById(uuid);
  }

  getById(uuid: string | null) {
    this.loading = true;
    if (uuid !== null) {
      this.marca = new Marca();
      this.sub.push(
        this.service.getById(uuid).subscribe(
          (data) => {
            this.modelo = data;
            this.marca = this.modelo.marca;
            this.fillSelectMarcas();
            this.loading = false;
          },
          (error) => {
            this.loading = false;
            this.showError(error.error.message);
          }
        )
      );
    } else {
      this.fillSelectMarcas();
    }
  }

  ngOnInit(): void {}

  fillSelectMarcas() {
    this.sub.push(
      this.marcaService.getAll(1, 200).subscribe(
        (data) => {
          this.listMarcas = data.content;
          if (this.modelo.uuid !== '') {
            for (var m of this.listMarcas) {
              if (m.nome === this.marca.nome) {
                this.marca = m;
              }
            }
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.showError(
            'Erro ao preencher o componente de marcas. Verifique sua conexão e tente novamente!'
          );
        }
      )
    );
  }

  salvar() {
    this.loading = true;

    const dto = new ModeloDTO();
    dto.uuid = this.modelo.uuid;
    dto.nome = this.modelo.nome;
    dto.ativo = this.modelo.ativo;
    dto.marca = this.marca.uuid;

    if (this.modelo.uuid !== '') {
      this.sub.push(
        this.service.update(this.modelo.uuid, dto).subscribe(
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

  onIncluirMarca() {
    const marca = new Marca();
    marca.nome = this.nomemarca;

    this.sub.push(
      this.marcaService.create(marca).subscribe(
        (data) => {
          this.marca = data;

          this.marcaService.getAll(1, 200).subscribe((data) => {
            this.listMarcas = data.content;
            for (var m of this.listMarcas) {
              if (m.nome === this.marca.nome) {
                this.marca = m;
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

  clearModalMarca() {
    this.nomemarca = '';
  }

  novo() {
    this.modelo = new Modelo();
    this.marca = new Marca();
    this.fillSelectMarcas();
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
    this.alertMensagem = `Modelo "${name}" salvo com sucesso!`;
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }
}
