import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DataStorageService } from '../../shared/data-storage.service';
import { HttpEvent } from '@angular/common/http';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    authState: Observable<fromAuth.State>;
    
    constructor(private dataStorageService: DataStorageService, 
                public authService: AuthService,
                private store: Store<fromApp.AppState>
                ){}
    
    ngOnInit(){
        this.authState = this.store.select('auth');
    }
    
    onSaveData(){
        this.dataStorageService.storeRecipe()
            .subscribe(
                (response: HttpEvent<Object>) => {
                    console.log(response)
                 }          
            );
      }
      
    onFetchData(){
        this.dataStorageService.getRecipes();
    }
    
    onLogout(){
        this.authService.logout();
    }
}
