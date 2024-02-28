import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';


@NgModule({
  exports: [RouterModule],
  providers: [LoginGuard],
})
export class AuthRoutingModule {}
