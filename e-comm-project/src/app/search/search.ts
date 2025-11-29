import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../services/product';
import { product } from '../data-type';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search implements OnInit {
  searchedProducts: undefined | product[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private product: Product
  ) {}

  ngOnInit(): void {
    // let query = this.activatedRoute.snapshot.paramMap.get('query'); // this will work only once
    // this.activatedRoute.params.subscribe((params) => {
    //   const query = params['query'];
    //   query &&
    //     this.product.searchProducts(query).subscribe((response) => {
    //       this.searchedProducts = response;
    //       console.warn(this.searchedProducts);
    //     });
    // }); // nested subscribe method
    this.activatedRoute.params
      .pipe(switchMap((params) => this.product.searchProducts(params['query'])))
      .subscribe((response) => {
        this.searchedProducts = response;
      });
    //       What switchMap does:
    // Receives the params
    // Cancels the previous HTTP request (if still running)
    // Starts a new search request
    // /search/l → /search/la → /search/lap → /search/lapt → /search/laptop
    // Without switchMap → all 5 HTTP calls run
    // With switchMap → only the latest call runs
  }
}
