import { Component } from '@angular/core';

import { Product, AppService } from './app.service';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService],
})
export class AppComponent {
  products: Product[];
  productsDataSource: DataSource;
  myStore: CustomStore;
  searchModeOption = 'contains';
  searchExprOption: any = 'Name';
  searchTimeoutOption = 200;
  minSearchLengthOption = 0;
  showDataBeforeSearchOption = false;

  constructor(service: AppService) {
    this.products = service.getProducts();
    this.myStore = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: () => {
        return service.getProducts();
      },
      insert: (val) => {
        return service.insertProduct(val);
      },
    });
    this.productsDataSource = new DataSource({
      store: this.myStore,
    });
  }

  addCustomItem = (data: any) => {
    if (!data.text) {
      data.customItem = null;
      return;
    }
    let productIds: any;
    this.myStore.load().then((e: any) => {
      productIds = e.map((item: Product) => item.id);
    });
    let incrementedId = Math.max.apply(null, productIds) + 1;
    let newItem = {
      Name: data.text,
      id: incrementedId,
    };
    this.myStore
      .insert(newItem)
      .then(() => this.productsDataSource.load())
      .then(() => newItem)
      .catch((error) => {
        throw error;
      });
  };
}
