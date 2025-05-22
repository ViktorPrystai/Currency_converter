import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './services/currency.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CurrencyService]
})
export class AppComponent implements OnInit {
  isDarkTheme = false;
  title = 'Конвертер валют';
  amount: number = 1;
  from: string = 'USD';
  to: string = 'EUR';
  result: number | null = null;
  currencies: { code: string; name: string }[] = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    this.isDarkTheme = theme === 'dark';

    if (this.isDarkTheme) {
      document.body.classList.add('dark-mode');
    }

    this.currencyService.getCurrencyList().subscribe(data => {
      this.currencies = Object.entries(data.data).map(([code, info]: any) => ({
        code,
        name: info.name
      }));
    });
  }

  convert() {
    this.currencyService.convert(this.from, this.to, this.amount).subscribe(data => {
      this.result = data.result;
    });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-mode', this.isDarkTheme);
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }
}
