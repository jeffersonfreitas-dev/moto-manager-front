import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mecanico } from '../mecanico';
import { MecanicoService } from '../mecanico.service';

@Component({
  selector: 'app-add-mecanicos',
  templateUrl: './add-mecanicos.component.html',
})
export class AddMecanicosComponent implements OnInit, OnDestroy {
  mecanico = new Mecanico();
  isErroAlert = false;
  isSuccessAlert = false;
  alertMensagem = '';
  loading: boolean = false;

  sub: Subscription[] = [];

  constructor(
    private service: MecanicoService,
    private routeActive: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
    let uuid = this.routeActive.snapshot.paramMap.get('uuid');
    if (uuid !== null) {
      this.sub.push(
        this.service.getById(uuid).subscribe(
          (data) => {
            this.mecanico = data;
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

  salvar() {
    this.loading = true;
    if (this.mecanico.uuid !== '') {
      this.sub.push(
        this.service.update(this.mecanico.uuid, this.mecanico).subscribe(
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
        this.service.create(this.mecanico).subscribe(
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
    this.mecanico = new Mecanico();
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
    this.alertMensagem = `Mecânico(a) "${name}" salvo(a) com sucesso!`;
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }
}
