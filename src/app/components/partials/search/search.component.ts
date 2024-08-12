import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  // @Output() eventSearch = new EventEmitter<string>();
  constructor(private route: ActivatedRoute, private router: Router) {
    route.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm'];
      }
    });
  }

  ngOnInit(): void {}
  search(term: string): void {
    if (term) this.router.navigateByUrl('/search/' + term);
  }
}
