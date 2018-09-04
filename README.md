# AngularTestProj

I faced a problem when I need to refresh tokens (access_token, refresh_token) before rendering full page.


## What was the goal:
- to refresh tokens before rendering full page

## First attempt
At the first time I tried to add resolver for parent component [AppComponent]. Here's template of AppComponent:
```HTML
<div class="header">
    My header
</div>
<router-outlet></router-outlet>
```

I found out that angular bootstraps AppComponent immediately and we can see ONLY header block. And when resolver get data, angular render (duplicate) header and content from `<router-outlet>`.

Then I added MainModule and MainComponent as the base of app. Then replaced resolver from AppComponent to MainComponent.
```TypeScript
{
    path: '',
    component: MainComponent, // from AppComponent - > MainComponent
    resolver: { state: StateResolverService },
    children: [
        { path: '', pathMatch:'full', component: HomeComponent },
        { path: 'info', component: InfoComponent }
    ]
}
```

app.component.html
```HTML
 <router-outlet></router-outlet>
```

main.component.html
```HTML
 <main-header></main-header>

 <a routerLink="/">Go to the main page</a>
 <a routerLink="/info">Go to the info page</a>

 <router-outlet></router-outlet>
```
In this case it works fine. Page appeared only after resolver got data. RESOLVER checks if user is logged in and if token isn't expired. If token is expired, RESOLVER send request to the server for new token pair.

Let's imagine that user is logged in and token isn't expired. Angular has successfully rendered the page. After some time we try to go to profile, but accees token is expired and resolver will not be fired to refresh it!

## Second attempt
At the second time I removed resolver from parent component and add it to all child components. Eventually, it works as intended: every time I go to another page, resolver is fired and do its job. But I don't want to specify this resolver for every child manually.

I found only one solution: to use canActivateChild instead of resolver. 

```TypeScript
{
    path: '',
    component: MainComponent,
    canActivateChild: [LoadGuard],
    children: [
        { path: '', pathMatch:'full', component: HomeComponent },
        { path: 'info', component: InfoComponent }
    ]
}
```

load.guard.ts
```TypeScript
@Injectable({
    providedIn: 'root'
})
export class LoadGuard implements CanActivateChild {
    constructor(private authS: AuthService) { }

    canActivateChild(): Promise<boolean> {
        let status = localStorage.getItem('status');
        if (status) {
            console.log("Tokens are ok!");
            this.authS.isLoggedIn.next(true);
            return Promise.resolve(true);
        }

        if (!status) {
            return new Promise( (res, rej) => {
                setTimeout( () => {
                    console.log("Try to refresh tokens");
                    localStorage.setItem('status','true');
                    this.authS.isLoggedIn.next(true);
                    return res(true);
                }, 3000);
            });
        }
    }
}
```

