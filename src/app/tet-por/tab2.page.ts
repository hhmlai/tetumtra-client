import { Component } from '@angular/core';
import { TetumtraService } from '../tetumtra.service';
import Tokenizer from 'sentence-tokenizer'

var tokenizer =  new Tokenizer('Chuck');

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  value = '';
  translation = ''
  queue = 0
  constructor(public transService: TetumtraService) { }
  translate() {
    this.transService.translate('ttpt', this)
  }
}