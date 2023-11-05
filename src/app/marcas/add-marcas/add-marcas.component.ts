import { MarcasService } from './../marcas.service';
import { Marca } from '../marca';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-marcas',
  templateUrl: './add-marcas.component.html',
})
export class AddMarcasComponent implements OnInit, OnDestroy {
  marca = new Marca();
  isErroAlert = false;
  isSuccessAlert = false;
  alertMensagem = '';
  loading: boolean = true;

  sub: Subscription[] = [];

  constructor(
    private service: MarcasService,
    private routeActive: ActivatedRoute
  ) {
    this.loading = true;
    let uuid = this.routeActive.snapshot.paramMap.get('uuid');
    if (uuid !== null) {
      this.sub.push(
        this.service.getById(uuid).subscribe(
          (data) => {
            this.marca = data;
            this.loading = false;
          },
          (error) => {
            this.loading = false;
            this.showError(error.error.message);
          }
        )
      );
    } else {
      this.loading = false;
    }
  }

  ngOnInit(): void {}

  salvar() {
    this.loading = true;
    if (this.marca.uuid !== '') {
      this.sub.push(
        this.service.update(this.marca.uuid, this.marca).subscribe(
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
        this.service.create(this.marca).subscribe(
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

  novo() {
    this.marca = new Marca();
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
    this.alertMensagem = `Marca "${name}" salva com sucesso!`;
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }
}
