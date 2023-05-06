import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'UserSearchPipe', pure: false })
export class UserSearchPipe implements PipeTransform {
  transform(value:any, args?:any) {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter((user:any) => {
        if (user.nom) {
          return user.nom.search(searchText) !== -1;
        }
        else{
          return user.username.search(searchText) !== -1;
        }
      });
    }
  }
}