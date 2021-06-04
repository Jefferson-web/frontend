import { FormGroup } from "@angular/forms";

export function confirmValidator( field1: string,  field2: string){
    return (group: FormGroup) => {
        let password1 = group.get(field1)?.value;
        let password2 = group.get(field2)?.value;
        if(password1 == password2){
            return null;
        }
        return {
            confirmValidator: true
        }
    }
}