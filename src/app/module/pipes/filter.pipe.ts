import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure:false,
})
export class FilterPipe implements PipeTransform {


  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    return items.filter(item => {
      return this.filterObject(item,searchText)
    });
   }

   filterObject(item,searchText){
    return Object.keys(item).some(key => {
      // if(typeof item[key]==='object'){
      //   return this.filterObject(item[key],searchText)
      // }else {

      // }
      return String(item[key]).toLowerCase().includes(searchText.toLowerCase());
    });
   }
}
