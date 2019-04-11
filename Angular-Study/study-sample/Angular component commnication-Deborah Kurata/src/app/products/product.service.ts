import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError, of, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'api/products';
  // retains the cache of list of products and sharing it
  private products: IProduct[];
  // currentProduct: IProduct | null;

  private selectedProductSource = new BehaviorSubject<IProduct | null>(null);
  selectedProductChange$ = this.selectedProductSource.asObservable();

  constructor(private http: HttpClient) { }
  
  // broadcast Notification
  changeSelectedProduct(selectedProduct:IProduct | null): void {
    this.selectedProductSource.next(selectedProduct);
  }

  getProducts(): Observable<IProduct[]> {
    if(this.products){
      return of(this.products);
    }
    return this.http.get<IProduct[]>(this.productsUrl)
               .pipe(
                  tap(data => console.log(JSON.stringify(data))),
                  tap(data => this.products = data),
                  catchError(this.handleError)
               );
  }

  getProduct(id: number): Observable<IProduct> {
    if(id === 0) {
      return of(this.initializeProduct());
    }
    // if products existed in cache
    if(this.products){
      const foundItem = this.products.find(item => item.id === id);
      if(foundItem){
        return of(foundItem);
      }
    }
    // if products did not existed in cache and id did not existed
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<IProduct>(url)
                    .pipe(
                      tap( data => console.log('Data:'+ JSON.stringify(data))),
                      catchError(this.handleError)
                    );
  }

  saveProduct(product:IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if(product.id === 0) {
      return this.createProduct(product, headers);
    }
    return this.updateProduct(product, headers);
  }

  deleteProdcuct(id: number): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<IProduct>(url, { headers: headers })
                    .pipe(
                      tap( data => console.log('Delete Product:'+ JSON.stringify(data))),
                      tap( data => {
                        const foundIndex = this.products.findIndex(item => item.id === id);
                        if(foundIndex > -1) {
                          this.products.splice(foundIndex, 1);
                          //this.currentProduct = null;
                          this.changeSelectedProduct(null);
                        }
                      }),
                      catchError(this.handleError)
                    );
  }

  private createProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
    product.id = null;   //for web-memeory api
    return this.http.post<IProduct>(this.productsUrl, product, { headers: headers} )
                    .pipe(
                        tap(data => console.log('Create Product: ' + product.id)),
                        tap(data => {
                          this.products.push(data);
                          //this.currentProduct = data;
                          this.changeSelectedProduct(data);
                        }),
                        catchError(this.handleError)
                    );
  }

  private updateProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<IProduct>(url, product, { headers: headers} )
                    .pipe(
                        tap(data => console.log('Update Product: ' + product.id)),
                        catchError(this.handleError)
                    );
  }

  private initializeProduct(): IProduct {
    // Return an initialized object
    return {
        id: 0,
        productName: '',
        productCode: '',
        category: '',
        tags: [],
        releaseDate: '',
        price: 0,
        description: '',
        starRating: 0,
        imageUrl: ''
    };
}

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
