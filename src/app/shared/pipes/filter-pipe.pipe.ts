import { Pipe, PipeTransform } from '@angular/core'
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return []
    }
    if (!searchText) {
      return items
    }
    searchText = searchText.toUpperCase().replace(/\s/g, '')
    return items.filter( (it: string) => {

      if ( it['user'] ) {
        return it['user']['last_name'].toUpperCase().replace(/\s/g, '').includes(searchText)
          || it['user']['first_name'].toUpperCase().replace(/\s/g, '').includes(searchText)
          || it['user']['mobile'].toUpperCase().replace(/\s/g, '').includes(searchText)
      } else {
        return it['last_name'].toUpperCase().replace(/\s/g, '').includes(searchText)
          || it['first_name'].toUpperCase().replace(/\s/g, '').includes(searchText)
          || it['mobile'].toUpperCase().replace(/\s/g, '').includes(searchText)
      }
    })
  }
}
