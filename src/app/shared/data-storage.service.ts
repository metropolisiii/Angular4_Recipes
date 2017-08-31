import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService{
    constructor(private http: Http, private recipeService: RecipeService){}
    
    storeRecipe(){
        return this.http.put('https://ng-recipe-book-7eb0f.firebaseio.com/data.json', 
            this.recipeService.getRecipes());  
    }
    
    getRecipes(){
        return this.http.get('https://ng-recipe-book-7eb0f.firebaseio.com/data.json')
            .map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
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