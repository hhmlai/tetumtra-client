import { Component } from '@angular/core';
import { TetumtraService } from '../tetumtra.service';
import Tokenizer from 'sentence-tokenizer'

var tokenizer = new Tokenizer('Chuck');

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  value = '';
  translation = ''
  constructor(public transService: TetumtraService) { }
  translate() {
    this.transService.translate('pttt', this)
  }
}