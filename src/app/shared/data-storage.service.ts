import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';


@Injectable()
export class DataStorageService{
    constructor(private httpClient: HttpClient, 
                private recipeService: RecipeService){}
    
    storeRecipe(){
                
       // return this.httpClient.put('https://ng-recipe-book-7eb0f.firebaseio.com/data.json', 
       //     this.recipeService.getRecipes(),{
       //         observe: 'body',
       //         params: new HttpParams().set('auth', token)
       //         //headers: new HttpHeaders().set('Authorization', 'Bearer asdfsdf')
       //     });

       const req = new HttpRequest('PUT', 'https://ng-recipe-book-7eb0f.firebaseio.com/data.json', this.recipeService.getRecipes(), {reportProgress: true});
       return this.httpClient.request(req);
    }
    
    getRecipes(){
        this.httpClient.get<Recipe[]>('https://ng-recipe-book-7eb0f.firebaseio.com/data.json', {
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