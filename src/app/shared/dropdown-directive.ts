import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[appDropDown]'
})

export class DropdownDirective{    
    @HostBinding('class.open') isOpen = false;
    
    @HostListener('click') toggleOpen(eventData: Event){
       this.isOpen = !this.isOpen;
    }
}