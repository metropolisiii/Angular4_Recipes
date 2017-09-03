import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService{
    constructor(private httpClient: HttpClient, 
                private recipeService: RecipeService,
                private authService: AuthService){}
    
    storeRecipe(){
        const token = this.authService.getToken();
        
       // return this.httpClient.put('https://ng-recipe-book-7eb0f.firebaseio.com/data.json', 
       //     this.recipeService.getRecipes(),{
       //         observe: 'body',
       //         params: new HttpParams().set('auth', token)
       //         //headers: new HttpHeaders().set('Authorization', 'Bearer asdfsdf')
       //     });

       const req = new HttpRequest('PUT', 'https://ng-recipe-book-7eb0f.firebaseio.com/data.json', this.recipeService.getRecipes(), {reportProgress: true, params: new HttpParams().set('auth', token)});
       return this.httpClient.request(req);
    }
    
    getRecipes(){
        const token = this.authService.getToken();
           
        this.httpClient.get<Recipe[]>('https://ng-recipe-book-7eb0f.firebaseio.com/data.json?auth=' + token, {
                                      observe: 'body',
                                      responseType: 'json'
        })
            .map(
                (recipes) => {
                    for (let recipe of recipes){
                        if (!recipe['ingredients']){
                            recipe['ingredients'] = []
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                 }
            );
    }
}