import { Pipe, PipeTransform } from '@angular/core';
import { baseUrl } from '../config/config';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {

  transform(img: string, tipo: string = 'users'): string {
    
    if (!img) {
      return baseUrl + '/images/users/no-available';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    let url = baseUrl + '/images';

    switch (tipo) {
      case 'users':
        url += '/users/' + img;
        break;
      case 'medicos':
        url += '/medicos/' + img;
        break;
      case 'hospitals':
        url += '/hospitals/' + img;
        break;
      default:
        /* Do nothing */
    }
    return url;
  }
}
