import { Pipe, PipeTransform } from '@angular/core';

/*
 * Convert bytes into largest possible unit.
 * Takes an precision argument that defaults to 2.
 * Usage:
 *   bytes | fileSize:precision
 * Example:
 *   {{ 1024 |  fileSize}}
 *   formats to: 1 KB
*/
@Pipe({name: 'cleanText'})
export class Tagspipe implements PipeTransform {

  transform(text: string) : string {
    return text.replace(/<(\w+)>|<\/(\w+)>/g,'');
  }
}
