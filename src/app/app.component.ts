import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  title = 'orange';
  jsonList: any = [];

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.service.getJson()
      .subscribe(res => {
          this.jsonList = res;
      });
  }
}
