import { NgModule } from "@angular/core";
import { MainComponent } from "./main.component";
import { MainRouterModule } from "./main-router.module";
import { HomeComponent } from "../views/home/home.component";
import { StateResolverService } from "../core/resolvers/state-resolver.service";
import { InfoComponent } from "../views/info/info.component";
import { AccessGuard } from "../core/guards/access.guard";
import { LoadGuard } from "../core/guards/load.guard";
import { HeaderComponent } from "./_header/_header.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        MainComponent,
        HomeComponent,
        InfoComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        MainRouterModule
    ],
    providers: [StateResolverService, AccessGuard, LoadGuard]
})
export class MainModule { }