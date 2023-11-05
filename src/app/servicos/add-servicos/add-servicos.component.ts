import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Servico } from '../servicos';
import { ServicoService } from '../servicos.service';

@Component({
  selector: 'app-add-servicos',
  templateUrl: './add-servicos.component.html',
})
export class AddServicosComponent implements OnInit {
  servico = new Servico();
  isErroAlert = false;
  isSuccessAlert = false;
  alertMensagem = '';
  loading: boolean = true;

  sub: Subscription[] = [];

  constructor(
    private service: ServicoService,
    private routeActive: ActivatedRoute
  ) {
    this.loading = true;
    let uuid = this.routeActive.snapshot.paramMap.get('uuid');
    if (uuid !== null) {
      this.sub.push(
        this.service.getById(uuid).subscribe(
          (data) => {
            this.servico = data;
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
    if (this.servico.uuid !== '') {
      this.sub.push(
        this.service.update(this.servico.uuid, this.servico).subscribe(
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
        this.service.create(this.servico).subscribe(
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
    this.servico = new Servico();
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
    this.alertMensagem = `Serviço "${name}" salvo com sucesso!`;
  }
}
