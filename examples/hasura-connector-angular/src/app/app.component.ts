import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: any[];
  loading = true;
  error: any;

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.apollo
      .query({
        query: gql`
          {
            products {
              id
              name
            }
          }
        `,
      })
      .subscribe((result: any) => {
        this.products = result.data && result.data.products;
        this.loading = result.loading;
        this.error = result.error;
      });
  }

}
