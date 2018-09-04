import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "../views/home/home.component";
import { StateResolverService } from "../core/resolvers/state-resolver.service";
import { MainComponent } from "./main.component";
import { InfoComponent } from "../views/info/info.component";
import { AccessGuard } from "../core/guards/access.guard";
import { LoadGuard } from "../core/guards/load.guard";

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivateChild: [LoadGuard],
        children: [
            { path: '', pathMatch:'full', component: HomeComponent },
            { path: 'info', component: InfoComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRouterModule {}