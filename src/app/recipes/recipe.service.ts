import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class RecipeService{    
    recipesChanged = new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [
        new Recipe(
            'Tasty cat', 
            'This is simply a test', 
            'data:image/jpeg;base64,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',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)               
            ]
            ),
        new Recipe('Another Test Recipe', 
           'What else you need to say?', 
           'data:image/jpeg;base64,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',
           [
            new Ingredient('Buns',2),
            new Ingredient('Meat',1),
           ])
    ];
    
    constructor (){}
    
    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
    getRecipes(){
        return this.recipes.slice();
    }
    
    getRecipe(index: number){
        return this.recipes[index];
    }
    
    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    
    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    
    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}