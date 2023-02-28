import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  noTodosClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>

  constructor(private todosService: TodosService) {
    this.activeCount$ = this.todosService.todos$.pipe(map((todos => todos.filter(todo => !todo.isCompleted).length)));
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
    )
    this.noTodosClass$ = this.todosService.todos$.pipe(map((todos => todos.length === 0)));
  }
 
}
