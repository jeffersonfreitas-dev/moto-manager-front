import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.component.html',
})
export class AddProdutoComponent implements OnInit {
  produto = new Produto();
  isErroAlert = false;
  isSuccessAlert = false;
  alertMensagem = '';
  loading: boolean = true;

  sub: Subscription[] = [];

  constructor(
    private service: ProdutoService,
    private routeActive: ActivatedRoute
  ) {
    this.loading = true;
    let uuid = this.routeActive.snapshot.paramMap.get('uuid');
    if (uuid !== null) {
      this.sub.push(
        this.service.getById(uuid).subscribe(
          (data) => {
            this.produto = data;
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
    if (this.produto.uuid !== '') {
      this.sub.push(
        this.service.update(this.produto.uuid, this.produto).subscribe(
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
        this.service.create(this.produto).subscribe(
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
    this.produto = new Produto();
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
    this.alertMensagem = `Produto "${name}" salvo com sucesso!`;
  }
}
