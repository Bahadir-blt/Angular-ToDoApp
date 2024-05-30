import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container" style="margin-top: 30px;">
  <h1>Todo App</h1>
  <hr>
  <div *ngIf="!isUpdateFormActive ; else active"  >
  <div class="form-group">
    <label class="mt-4 mb-4" for="work">Yapılacak İş</label>
    <input
      type="text"
      [class]="changeInputClass()" 
      id="work"
      name="work"
      [(ngModel)]="work">
      <div class="invalid-feedback">En Az 3 Karakter  Girmelisiniz !</div>
  </div>
  <div class="form-group mt-2">
    <button [disabled]="work.length < 3" class="btn btn-outline-primary w-100" (click)="save()" >Kaydet</button>
  </div>
  </div>

  <ng-template  #active>
  <div class="form-group">
    <label class="mt-4 mb-4" for="work">Yapılacak İş</label>
    <input
      type="text"
      class="form-control " 
      id="work"
      name="work"
      [(ngModel)]="updateWork">
  </div>
  <div class="form-group mt-2">
    <button   class="btn btn-outline-warning w-100" (click)="update()" >Güncelle</button>
    <button (click)="cancel()"  class="btn btn-outline-danger w-100 mt-2">Vazgeç</button>
  </div>
  </ng-template>
  <hr>
  <ul>
    <li class="mt-1"  *ngFor="let w of works let i = index" > {{w}} 
    <div *ngIf="!isUpdateFormActive"  >
    <button (click)="get(w, i)"  class="btn btn-outline-warning btn-sm mx-1">Güncelle</button>

  <button (click)="remove(i)" class="btn btn-outline-danger btn-sm">Sil</button>
</div>
   </li>
  </ul>
  
  </div>`

})
export class AppComponent {
  isUpdateFormActive: boolean = false;
  work: string = "";
  updateWork: string = ""
  works: string[] = ["Deneme 1", "Deneme 2 ", "Deneme 3 "];
  index: number = 0;

  save() {
    this.works.push(this.work);
    this.work = "";
  }

  remove(index: number) {
    let result: boolean = confirm("Kaydı Silmet İstiyor Musunuz ?")
    if (result) {
      this.works.splice(index, 1);
    }
  }
  get(work: string, index: number) {
    this.updateWork = work;
    this.index = index
    this.isUpdateFormActive = true;
  }
  update() {
    this.works[this.index] = this.updateWork
    this.cancel();
  }

  cancel() {
    this.isUpdateFormActive = false
  }

  changeInputClass() {
    if (this.work.length < 3)
      return "form-control is-invalid"

    return "form-control is-valid"
  }

}
