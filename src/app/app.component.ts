import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'newApp';
  tableValues = JSON.parse(JSON.stringify(localStorage.getItem('data')));
  tax = 'NA';
  btnName = '';
  updateIndex = 0;

  ngOnInit(): void {
      this.tableValues = JSON.parse(this.tableValues)
  }

  @ViewChild('modalWrapper') modalWrapper : ElementRef
  @ViewChild('itemName') itemName : ElementRef
  @ViewChild('quantity') quantity : ElementRef
  @ViewChild('unit') unit : ElementRef
  @ViewChild('companyName') companyName : ElementRef
  @ViewChild('mfgDate') mfgDate : ElementRef
  @ViewChild('expDate') expDate : ElementRef
  @ViewChild('type') type : ElementRef
  @ViewChild('price') price : ElementRef
  @ViewChild('discount') discount : ElementRef
  @ViewChild('taxValue') taxValue : ElementRef


  openModal() {
    this.btnName = 'Save';
    this.modalWrapper.nativeElement.style.display = 'block';
  }
  closeModal() {
    this.modalWrapper.nativeElement.style.display = 'none';
  }
  saveItem() {
    const obj = {
      itemName : this.itemName.nativeElement.value,
      quantity : this.quantity.nativeElement.value,
      unit : this.unit.nativeElement.value,
      companyName : this.companyName.nativeElement.value,
      mfgDate : this.mfgDate.nativeElement.value,
      expDate : this.expDate.nativeElement.value,
      type : this.type.nativeElement.value,
      discount : this.discount.nativeElement.value,
      price : this.price.nativeElement.value,
      taxValue : this.tax,
    }
    let emptyArray = [];
    if (this.btnName === 'Save') {
      if (!this.tableValues) {
        emptyArray = []
      } else {
        emptyArray = this.tableValues;
      }
      emptyArray.push(obj);
    } else {
      emptyArray = this.tableValues;
      emptyArray[this.updateIndex] = obj;
    }
    localStorage.setItem('data', JSON.stringify(emptyArray));
    this.tableValues = JSON.parse(JSON.stringify(localStorage.getItem('data')));
    this.tableValues = JSON.parse(this.tableValues);
    this.itemName.nativeElement.value = '';
    this.quantity.nativeElement.value = '';
    this.unit.nativeElement.value = '';
    this.companyName.nativeElement.value = '';
    this.mfgDate.nativeElement.value = '';
    this.expDate.nativeElement.value = '';
    this.type.nativeElement.value = '';
    this.discount.nativeElement.value = '';
    this.price.nativeElement.value = '';
    this.modalWrapper.nativeElement.style.display = 'none';
  }

  onChange() {
    var value = this.type.nativeElement.value;
    if (value !== 'Edible') {
      this.tax = '10%';
    } else {
      this.tax = '5%';
    }
  }

  updateItem(event: any) {
    this.btnName = "Update";
    const index = event.target.id;
    this.updateIndex = index;
    const obj = this.tableValues[index];
    this.itemName.nativeElement.value = obj.itemName;
    this.quantity.nativeElement.value = obj.quantity;
    this.unit.nativeElement.value = obj.unit;
    this.companyName.nativeElement.value = obj.companyName;
    this.mfgDate.nativeElement.value = obj.mfgDate;
    this.expDate.nativeElement.value = obj.expDate;
    this.type.nativeElement.value = obj.type;
    this.discount.nativeElement.value = obj.discount;
    this.price.nativeElement.value = obj.price;
    this.tax = obj.taxValue;
    this.modalWrapper.nativeElement.style.display = 'block';
  }

  deleteItem(event: any) {
    console.log('success');
    const index = event.target.id;
    let duplicateData = this.tableValues;
    duplicateData.splice(index, 1);
    localStorage.setItem('data',JSON.stringify(duplicateData));
    this.tableValues = JSON.parse(JSON.stringify(localStorage.getItem('data')));
    this.tableValues = JSON.parse(this.tableValues);
  }
}
